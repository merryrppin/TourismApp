CREATE TABLE [dbo].[tblFotoPuntoReferencia]
(
	[IdFotoPuntoReferencia] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[UrlFoto] VARCHAR(500) NOT NULL,
	[IdPuntoReferencia] INT NOT NULL,
    CONSTRAINT [FK_tblFotoPuntoReferencia_tblPuntoReferencia] FOREIGN KEY ([IdPuntoReferencia]) REFERENCES [tblPuntoReferencia]([IdPuntoReferencia]),
)
