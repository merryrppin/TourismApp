CREATE TABLE [dbo].[tblRutaAlternativa_tblPuntoReferencia]
(
	[IdRutaAlternativaPuntoReferencia] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdRutaAlternativa] INT NOT NULL,
	[IdPuntoReferencia] INT NOT NULL,
    CONSTRAINT [FK_tblRutaAlternativa_tblPuntoReferencia_tblRutaAlternativa] FOREIGN KEY ([IdRutaAlternativa]) REFERENCES [tblRutaAlternativa]([IdRutaAlternativa]),
    CONSTRAINT [FK_tblRutaAlternativa_tblPuntoReferencia_tblPuntoReferencia] FOREIGN KEY ([IdPuntoReferencia]) REFERENCES [tblPuntoReferencia]([IdPuntoReferencia])
)
