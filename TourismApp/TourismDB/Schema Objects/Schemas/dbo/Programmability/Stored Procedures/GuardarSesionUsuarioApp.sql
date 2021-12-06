CREATE PROCEDURE [dbo].[GuardarSesionUsuarioApp]
	@jsonDatosUsuario VARCHAR(MAX),
	@IdSesion VARCHAR(100)
AS
BEGIN
    CREATE TABLE #DatosUsuario([IdToken] VARCHAR(MAX), [GivenName] VARCHAR(150), [FamilyName] VARCHAR(150), [Email] VARCHAR(150), ImageUrl VARCHAR(250), LoginType VARCHAR(50))
        
    DECLARE @UserId AS INT;
    DECLARE @UserIdTable AS TABLE (UserId INT);
    DECLARE @SavedSesionIdTable AS TABLE (SavedSesionId UNIQUEIDENTIFIER);
    DECLARE @NewIdSession UNIQUEIDENTIFIER = (SELECT NEWID());

    INSERT INTO #DatosUsuario([IdToken], [GivenName], [FamilyName], [Email], LoginType)
    SELECT IdToken, GivenName, FamilyName, Email, LoginType
    FROM OPENJSON(@jsonDatosUsuario)
        WITH (
          IdToken VARCHAR(MAX) 'strict $.IdToken',
          GivenName VARCHAR(150) 'strict $.GivenName',
          FamilyName VARCHAR(150) 'strict $.FamilyName',
          Email VARCHAR(150) 'strict $.Email',
          ImageUrl VARCHAR(250) 'strict $.ImageUrl',
          LoginType VARCHAR(50) 'strict $.LoginType'
        );
    
    MERGE [tblUsuarioApp] AS UsuarioApp
    USING (SELECT IdToken, GivenName, FamilyName, Email, ImageUrl, LoginType FROM #DatosUsuario) AS InputData
    ON (UsuarioApp.IdToken = InputData.IdToken)
    WHEN MATCHED THEN
        UPDATE SET UsuarioApp.GivenName = InputData.GivenName, UsuarioApp.FamilyName = InputData.FamilyName, UsuarioApp.Email = InputData.Email, UsuarioApp.ImageUrl = InputData.ImageUrl
    WHEN NOT MATCHED THEN
        INSERT(IdToken, GivenName, FamilyName, Email, ImageUrl, LoginType)
        VALUES(InputData.IdToken, InputData.GivenName, InputData.FamilyName, InputData.Email, InputData.ImageUrl, InputData.LoginType)
    OUTPUT inserted.IdUsuario INTO @UserIdTable;

    SELECT @UserId = UserId FROM @UserIdTable;

    MERGE [tblSesionUsuarioApp] AS SesionUA
    USING(SELECT @UserId AS IdUsuario, @IdSesion AS IdSesion) AS InputDataSesion
    ON ((InputDataSesion.IdSesion = '' AND SesionUA.IdUsuario = InputDataSesion.IdUsuario) OR (InputDataSesion.IdSesion != '' AND SesionUA.IdSesion = InputDataSesion.IdSesion))
    WHEN MATCHED THEN
        UPDATE SET SesionUA.UltimaFechaLogin = GETDATE()
    WHEN NOT MATCHED THEN
        INSERT(IdUsuario, SesionActiva, UltimaFechaLogin, IdSesion)
        VALUES(@UserId, 1, GETDATE(), @NewIdSession)
    OUTPUT inserted.IdSesion INTO @SavedSesionIdTable;
    
    SELECT SavedSesionId FROM @SavedSesionIdTable;

    IF OBJECT_ID('tempdb..#DatosUsuario') IS NOT NULL DROP TABLE #DatosUsuario;

END