CREATE PROCEDURE CambiarCredenciales(@realPassword VARCHAR(MAX), @newPassword VARCHAR(MAX),@Usuario VARCHAR(100))
AS BEGIN

	UPDATE tblUsuarioWeb SET [Password] =@newPassword,[FechaModificacion] = GETDATE() WHERE [Password] = @realPassword AND NombreUsuario = @Usuario 

	IF @@ROWCOUNT > 0 BEGIN
		SELECT 'Clave actualizada correctamente' AS [Mensaje]
	END
	ELSE BEGIN
		SELECT 'La clave no se actualizo, revise la credencial altual' [Mensaje]
	END

END