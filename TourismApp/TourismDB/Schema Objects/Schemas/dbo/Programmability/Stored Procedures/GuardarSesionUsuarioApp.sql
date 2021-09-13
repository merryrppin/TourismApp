CREATE PROCEDURE [dbo].[GuardarSesionUsuarioApp]
	@jsonDatosUsuario VARCHAR(MAX),
	@IdSesion VARCHAR(100)
AS
BEGIN
    CREATE TABLE #DatosUsuario([IdUsuario] INT, [IdToken] VARCHAR(100), [GivenName] VARCHAR(150), [FamilyName] VARCHAR(150), [Email] VARCHAR(150))
    DECLARE @UserId INT;
    DECLARE @NewIdSession UNIQUEIDENTIFIER = (SELECT NEWID());
    DECLARE @SavedSesionId UNIQUEIDENTIFIER;

    INSERT INTO #DatosUsuario([IdUsuario], [IdToken], [GivenName], [FamilyName], [Email])
    SELECT IdUsuario, IdToken, GivenName, FamilyName, Email
    FROM OPENJSON(@jsonDatosUsuario)
        WITH (
          IdUsuario INT 'strict $.IdUsuario',
          IdToken NVARCHAR(100) '$.strict.IdToken',
          GivenName NVARCHAR(150) '$.strict.GivenName',
          FamilyName NVARCHAR(150) '$.strict.FamilyName',
          Email NVARCHAR(150) '$.strict.Email'
        );
    
    MERGE [tblUsuarioApp] AS UsuarioApp
    USING (SELECT IdUsuario, IdToken, GivenName, FamilyName, Email FROM #DatosUsuario) AS InputData
    ON (UsuarioApp.IdToken = InputData.IdToken)
    WHEN MATCHED THEN
        UPDATE SET UsuarioApp.GivenName = InputData.GivenName, UsuarioApp.FamilyName = InputData.FamilyName, UsuarioApp.Email = InputData.Email
    WHEN NOT MATCHED THEN
        INSERT(IdToken, GivenName, FamilyName, Email)
        VALUES(InputData.IdToken, InputData.GivenName, InputData.FamilyName, InputData.Email)
    OUTPUT inserted.IdUsuario INTO @UserId;

    MERGE [tblSesionUsuarioApp] AS SesionUA
    USING(SELECT @UserId AS IdUsuario, @IdSesion AS IdSesion) AS InputDataSesion
    ON (SesionUA.IdSesion = InputDataSesion.IsSesion)
    WHEN MATCHED THEN
        UPDATE SET SesionUA.UltimaFechaLogin = GETDATE()
    WHEN NOT MATCHED THEN
        INSERT(IdUsuario, SesionActiva, UltimaFechaLogin, IdSesion)
        VALUES(@UserId, 1, GETDATE(), @NewIdSession)
    OUTPUT inserted.IdSesion INTO @SavedSesionId;
    
    SELECT @SavedSesionId;

    IF OBJECT_ID('tempdb..#DatosUsuario') IS NOT NULL DROP TABLE #DatosUsuario;

END