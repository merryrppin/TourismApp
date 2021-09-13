CREATE TABLE [dbo].[tblSesionUsuarioApp]
(
	[IdSesionUsuarioApp] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[IdUsuario] INT NOT NULL, 
    [SesionActiva] BIT NOT NULL DEFAULT (1), 
    [UltimaFechaLogin] DATETIME NOT NULL, 
    [IdSesion] VARCHAR(100) NOT NULL , 
    CONSTRAINT [FK_tblSesionUsuarioApp_tblSesionUsuario] FOREIGN KEY ([IdUsuario]) REFERENCES [tblUsuarioApp]([IdUsuario])
)
