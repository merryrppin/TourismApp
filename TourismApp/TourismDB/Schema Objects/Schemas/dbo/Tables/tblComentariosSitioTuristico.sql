CREATE TABLE [dbo].[tblComentariosSitioTuristico]
(
	[IdComentariosSitioTuristico] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdSitioTuristico] INT NOT NULL,
	[Email] VARCHAR(150) NOT NULL,
	[LoginType] VARCHAR(50) NOT NULL,
	[Calificacion] INT NOT NULL,
	[Comentarios] VARCHAR(MAX) NOT NULL,
	[img1] VARCHAR(MAX),
	[img1Aprobada] BIT DEFAULT(0),
	[img2] VARCHAR(MAX),
	[img2Aprobada] BIT DEFAULT(0), 
	[DiaRegistro] DATETIME NOt NULL DEFAULT(GETDATE()),
    [NombreCompleto] VARCHAR(250) NULL, 
    CONSTRAINT [FK_tblComentariosSitioTuristico_tblSitioTuristico] FOREIGN KEY ([IdSitioTuristico]) REFERENCES [tblSitioTuristico]([IdSitioTuristico])
)
