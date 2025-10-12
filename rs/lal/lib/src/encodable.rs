mod error;

use std::{fmt, str::FromStr};

use super::decodable::Decodable;

pub use self::error::ParseError;

#[derive(Debug, PartialEq)]
pub struct Encodable(String);

impl FromStr for Encodable {
    type Err = ParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let s = s.to_owned();

        if s.chars().all(|c| ('A'..='O').contains(&c)) {
            Ok(Encodable(s))
        } else {
            Err(ParseError::InvalidInput(s))
        }
    }
}

impl fmt::Display for Encodable {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl Encodable {
    pub(crate) fn from_unchecked<T: Into<String>>(s: T) -> Encodable {
        Encodable(s.into())
    }

    pub fn encode(&self) -> Decodable {
        let s: String = self
            .0
            .bytes()
            .map(|b| {
                let offset = b - b'A' + 1;
                let decimal = if offset <= 9 {
                    b'0' + offset
                } else {
                    b'A' + offset - 10
                };
                decimal as char
            })
            .collect();

        Decodable::from_unchecked(s)
    }
}

#[cfg(test)]
mod tests {
    use rstest::rstest;

    use super::*;

    #[rstest(
        in_str,
        out_str,
        case("", ""),
        case("ABCD", "1234"),
        case("ODIO", "F49F")
    )]
    fn encode(in_str: &str, out_str: &str) {
        let encodable = Encodable::from_unchecked(in_str);
        let decodable = Decodable::from_unchecked(out_str);
        assert_eq!(encodable.encode(), decodable);
    }
}
