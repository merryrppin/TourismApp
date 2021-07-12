CREATE TABLE [dbo].[tblMunicipio]
(
	[IdMunicipio] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NombreMunicipio] VARCHAR(150) NOT NULL,
	[Activo] BIT NOT NULL DEFAULT(0)
)