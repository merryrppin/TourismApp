CREATE TABLE [dbo].[tblPuntoReferencia]
(
	[IdPuntoReferencia] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdSitioTuristico] INT NOT NULL,
	[Latitud] DECIMAL(8, 6) NOT NULL,
	[Longitud] DECIMAL(9, 6) NOT NULL,
	[Altitud] FLOAT NULL,
	[TimeRec] VARCHAR(50) NOT NULL,
	[NombrePunto] VARCHAR(250) NOT NULL,
	[NombrePuntoENG] VARCHAR(250),
	[DescripcionPunto] VARCHAR(MAX) NULL,
	[DescripcionPuntoENG] VARCHAR(MAX) NULL,
	[FotoPrincipal] VARCHAR(500) NULL,
	[Cmt] VARCHAR(500) NULL,
	[Orden] INT NOT NULL,
    CONSTRAINT [FK_tblPuntoReferencia_tblSitioTuristico] FOREIGN KEY ([IdSitioTuristico]) REFERENCES [tblSitioTuristico]([IdSitioTuristico])
)