CREATE PROCEDURE [dbo].[ObtenerSesionUsuarioApp]
	@IdSesion AS VARCHAR(100)
AS BEGIN
	SELECT TOP 1 ua.IdToken, ua.GivenName, ua.FamilyName, ua.Email, ua.ImageUrl
	FROM tblUsuarioApp AS ua
	INNER JOIN tblSesionUsuarioApp AS sua ON ua.IdUsuario = sua.IdUsuario
	WHERE sua.IdSesion = @IdSesion AND SesionActiva = 1
END
