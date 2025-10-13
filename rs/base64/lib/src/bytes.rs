use std::fmt;

use derive_more::From;

use super::base64::Base64;

#[derive(Debug, PartialEq, From)]
pub struct Bytes(Vec<u8>);

impl fmt::Display for Bytes {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", String::from_utf8_lossy(&self.0))
    }
}

impl Bytes {
    pub fn encode(&self) -> Base64 {
        let mut bits: u32 = 0b0;
        let mut bit_count: u8 = 0;
        let mut bytes = Vec::new();

        for &byte in &self.0 {
            bits = (bits << 8) | byte as u32;
            bit_count += 8;

            while bit_count >= 6 {
                bit_count -= 6;
                let index = ((bits >> bit_count) & 0b11_1111) as usize;
                bytes.push(BYTES[index]);
            }
        }

        if bit_count > 0 {
            let index = ((bits << (6 - bit_count)) & 0b11_1111) as usize;
            bytes.push(BYTES[index]);
        }

        while bytes.len() % 4 != 0 {
            bytes.push(b'=');
        }

        Base64::from_unchecked(unsafe { str::from_utf8_unchecked(&bytes) })
    }
}

static BYTES: &[u8; 64] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

#[cfg(test)]
mod tests {
    use rstest::rstest;

    use super::*;

    #[rstest(
        input,
        out_str,
        case("", ""),
        case("foo", "Zm9v"),
        case("foobar", "Zm9vYmFy"),
        case(" ", "IA=="),
        case("!", "IQ=="),
        case("Hello, World!", "SGVsbG8sIFdvcmxkIQ=="),
        case("\n", "Cg=="),
        case("\r\n", "DQo="),
        case("こんにちは", "44GT44KT44Gr44Gh44Gv"),
        case("𠮷野家", "8KCut+mHjuWutg=="),
        case("😊", "8J+Yig==")
    )]
    fn encode(input: &str, out_str: &str) {
        let bytes = Bytes(input.into());
        let base64 = Base64::from_unchecked(out_str);
        assert_eq!(bytes.encode(), base64);
    }
}
