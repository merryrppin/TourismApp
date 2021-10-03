CREATE TABLE [dbo].[tblRutaAlternativa]
(
	[IdRutaAlternativa] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NombreRutaAlternativaSenderismo] VARCHAR(250) NOT NULL,
	[NombreRutaAlternativaSenderismoENG] VARCHAR(250) NOT NULL,
	[IdRutaSenderismo] INT NOT NULL,
    CONSTRAINT [FK_tblRutaAlternativa_tblRutaSenderismo] FOREIGN KEY ([IdRutaSenderismo]) REFERENCES [tblRutaSenderismo]([IdRutaSenderismo])
)
