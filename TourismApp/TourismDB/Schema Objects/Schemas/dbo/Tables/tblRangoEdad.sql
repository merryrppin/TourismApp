CREATE TABLE [dbo].[tblRangoEdad]
(
	[IdRangoEdad] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[NombreRangoEdadESP] VARCHAR(50) NOT NULL,
	[NombreRangoEdadENG] VARCHAR(50) NULL,
	[EdadInicial] INT NULL,
	[EdadFinal] INT NULL,
	[Orden] INT NOT NULL
)
