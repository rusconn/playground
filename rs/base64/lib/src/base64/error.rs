use thiserror::Error;

#[derive(Debug, Error)]
pub enum ParseError {
    #[error("invalid length")]
    InvalidLength,
    #[error("invalid input: {0:?}")]
    InvalidInput(Vec<u8>),
}
