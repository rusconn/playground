use std::io;

use thiserror::Error;

use lal::{decodable, encodable};

#[derive(Debug, Error)]
pub(crate) enum AppError {
    #[error("failed to encode: {}", show_parse_encodable_error(.0))]
    ParseEncodable(#[from] encodable::ParseError),

    #[error("failed to decode: {}", show_parse_decodable_error(.0))]
    ParseDecodable(#[from] decodable::ParseError),

    #[error(transparent)]
    Io(#[from] io::Error),
}

fn show_parse_encodable_error(e: &encodable::ParseError) -> String {
    match e {
        encodable::ParseError::InvalidInput(s) => format!("invalid input: {s}"),
    }
}

fn show_parse_decodable_error(e: &decodable::ParseError) -> String {
    match e {
        decodable::ParseError::InvalidInput(s) => format!("invalid input: {s}"),
    }
}
