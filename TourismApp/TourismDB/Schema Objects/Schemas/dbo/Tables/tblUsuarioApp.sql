CREATE TABLE [dbo].[tblUsuarioApp]
(
	[IdUsuario] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [IdToken] VARCHAR(MAX) NOT NULL, 
    [GivenName] VARCHAR(150) NOT NULL, 
    [FamilyName] VARCHAR(150) NULL, 
    [Email] VARCHAR(150) NOT NULL, 
    [ImageUrl] VARCHAR(250) NULL
)
