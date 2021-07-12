CREATE TABLE [dbo].[tblSitioTuristico]
(
	[IdSitioTuristico] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NombreSitioTuristicoESP] VARCHAR(500) NOT NULL,
	[NombreSitioTuristicoENG] VARCHAR(500) NULL,
	[IdMunicipio] INT NOT NULL,
	[Latitud] DECIMAL(12, 9) NULL,
	[Longitud] DECIMAL(12, 9) NULL,
	[Altitud] DECIMAL(12, 9) NULL,
	[IconoMarcador] VARCHAR(250) NULL,
	[Activo] BIT NOT NULL DEFAULT(0), 
    CONSTRAINT [FK_tblSitioTuristico_tblMunicipio] FOREIGN KEY ([IdMunicipio]) REFERENCES [tblMunicipio]([IdMunicipio])
)
