CREATE TABLE [dbo].[tblTipoSitioTuristico]
(
	[IdTipoSitioTuristico] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Nombre] VARCHAR(250),
	[Codigo] VARCHAR(10),
	[Activo] BIT DEFAULT 1
)
