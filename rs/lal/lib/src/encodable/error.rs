use thiserror::Error;

#[derive(Debug, Error)]
pub enum ParseError {
    #[error("invalid input: {0:?}")]
    InvalidInput(String),
}
