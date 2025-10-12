use std::str::FromStr;

use derive_more::Display;
use thiserror::Error;

use super::encodable::Encodable;

#[derive(Debug, PartialEq, Display)]
pub struct Decodable(String);

impl FromStr for Decodable {
    type Err = ParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let s = s.to_owned();

        if s.chars()
            .all(|c| ('1'..='9').contains(&c) || ('A'..='F').contains(&c))
        {
            Ok(Decodable(s))
        } else {
            Err(ParseError::InvalidInput(s))
        }
    }
}

impl Decodable {
    pub(crate) fn from_unchecked<T: Into<String>>(s: T) -> Decodable {
        Decodable(s.into())
    }

    pub fn decode(&self) -> Encodable {
        let s: String = self
            .0
            .bytes()
            .map(|b| {
                let decimal = if (b'1'..=b'9').contains(&b) {
                    b - b'0'
                } else {
                    b - b'A' + 10
                };
                let offset = decimal - 1;
                (b'A' + offset) as char
            })
            .collect();

        Encodable::from_unchecked(s)
    }
}

#[derive(Debug, Error)]
pub enum ParseError {
    #[error("invalid input: {0:?}")]
    InvalidInput(String),
}

#[cfg(test)]
mod tests {
    use rstest::rstest;

    use super::*;

    #[rstest(
        in_str,
        out_str,
        case("", ""),
        case("1234", "ABCD"),
        case("F49F", "ODIO")
    )]
    fn decode(in_str: &str, out_str: &str) {
        let decodable = Decodable::from_unchecked(in_str);
        let encodable = Encodable::from_unchecked(out_str);
        assert_eq!(decodable.decode(), encodable);
    }
}
