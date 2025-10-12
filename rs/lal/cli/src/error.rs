use std::io;

use thiserror::Error;

use lal::{ParseDecodableError, ParseEncodableError};

#[derive(Debug, Error)]
pub(crate) enum AppError {
    #[error("failed to encode: {}", show_parse_encodable_error(.0))]
    ParseEncodable(#[from] ParseEncodableError),
    #[error("failed to decode: {}", show_parse_decodable_error(.0))]
    ParseDecodable(#[from] ParseDecodableError),
    #[error("{0}")]
    Io(#[from] io::Error),
}

fn show_parse_encodable_error(e: &ParseEncodableError) -> String {
    match e {
        ParseEncodableError::InvalidInput(s) => format!("invalid input: {s}"),
    }
}

fn show_parse_decodable_error(e: &ParseDecodableError) -> String {
    match e {
        ParseDecodableError::InvalidInput(s) => format!("invalid input: {s}"),
    }
}
