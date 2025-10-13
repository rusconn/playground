use std::{collections::HashMap, sync::LazyLock};

use derive_more::Display;
use regex::bytes::Regex;
use thiserror::Error;

use super::bytes::Bytes;

#[derive(Debug, PartialEq, Display)]
pub struct Base64(String);

impl TryFrom<Vec<u8>> for Base64 {
    type Error = ParseError;

    fn try_from(value: Vec<u8>) -> Result<Self, Self::Error> {
        if !value.len().is_multiple_of(4) {
            return Err(ParseError::InvalidLength);
        }
        if !Regex::new("^[A-Za-z0-9+/]*={0,2}$")
            .unwrap_or_else(|e| panic!("failed to create Regex: {e}"))
            .is_match(&value)
        {
            return Err(ParseError::InvalidInput(value));
        }

        Ok(Self(unsafe { String::from_utf8_unchecked(value) }))
    }
}

impl Base64 {
    pub fn decode(&self) -> Bytes {
        let string = self.0.replace('=', "");
        let mut bits: u32 = 0b0;
        let mut bit_count = 0;
        let mut bytes = Vec::new();

        for ch in string.chars() {
            let val = *TABLE.get(&ch).expect("ch exists in TABLE");
            bits = (bits << 6) | val as u32;
            bit_count += 6;

            while bit_count >= 8 {
                bit_count -= 8;
                bytes.push(((bits >> bit_count) & 0xff) as u8);
            }
        }

        bytes.into()
    }

    pub(crate) fn from_unchecked<T: Into<String>>(value: T) -> Self {
        Base64(value.into())
    }
}

#[derive(Debug, Error)]
pub enum ParseError {
    #[error("invalid length")]
    InvalidLength,

    #[error("invalid input: {0:?}")]
    InvalidInput(Vec<u8>),
}

static TABLE: LazyLock<HashMap<char, u8>> = LazyLock::new(|| {
    let mut map = HashMap::new();
    for (i, ch) in CHARS.chars().enumerate() {
        map.insert(ch, i as u8);
    }
    map
});

const CHARS: &str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

#[cfg(test)]
mod tests {
    use rstest::rstest;

    use super::*;

    #[rstest(
        input,
        out_str,
        case("", ""),
        case("Zm9v", "foo"),
        case("Zm9vYmFy", "foobar"),
        case("IA==", " "),
        case("IQ==", "!"),
        case("SGVsbG8sIFdvcmxkIQ==", "Hello, World!"),
        case("Cg==", "\n"),
        case("DQo=", "\r\n"),
        case("44GT44KT44Gr44Gh44Gv", "こんにちは"),
        case("8KCut+mHjuWutg==", "𠮷野家"),
        case("8J+Yig==", "😊")
    )]
    fn decode(input: &str, out_str: &str) {
        let base64 = Base64(input.into());
        let bytes = Bytes::from(out_str.as_bytes().to_vec());
        assert_eq!(base64.decode(), bytes);
    }
}
