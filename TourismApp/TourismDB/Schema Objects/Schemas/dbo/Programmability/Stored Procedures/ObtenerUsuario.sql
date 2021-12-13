CREATE PROCEDURE ObtenerUsuario(@Email VARCHAR(100),@Password VARCHAR(100))
AS BEGIN
	SELECT TOP 1 Email,NombreUsuario FROM tblUsuarioWeb WHERE Email = @Email AND [Password]= @Password
END