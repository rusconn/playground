use std::{io, path::PathBuf};

use thiserror::Error;

use base64::ParseBase64Error;

#[derive(Debug, Error)]
pub(crate) enum AppError {
    #[error("failed to convert: invalid base64")]
    ParseBase64(#[from] ParseBase64Error),
    #[error("failed to read {path}: {source}")]
    ReadFile {
        path: PathBuf,
        #[source]
        source: io::Error,
    },
    #[error("{0}")]
    Io(#[from] io::Error),
}
