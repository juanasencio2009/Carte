USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[MenuItems_Insert]    Script Date: 8/30/2022 7:11:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Juan Asencio
-- Create date: 25Aug2022
-- Description:	A proc to Insert into dbo.MenuItems.
-- Code Reviewer: Luis Rios


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[MenuItems_Insert]
			@OrganizationId int
           ,@OrderStatusId int
           ,@UnitCost decimal(18,2)
           ,@Name nvarchar(100)
           ,@Description nvarchar(500)
           ,@ImageUrl nvarchar(255)
           ,@CreatedBy int
           ,@ModifiedBy int
		   ,@Id int OUTPUT
as
/*
Declare
			@OrganizationId int = 1
           ,@OrderStatusId int = 1
           ,@UnitCost decimal(18,2) = 7.50
           ,@Name nvarchar(100) = 'InsertMenuName'
           ,@Description nvarchar(500) = 'InsertMenuDescription'
           ,@ImageUrl nvarchar(255) = 'https://tinyurl.com/tpbs5wcd'
           ,@CreatedBy int = 1
           ,@ModifiedBy int = 1
		   ,@Id int

EXEC dbo.MenuItems_Insert
			@OrganizationId 
           ,@OrderStatusId 
           ,@UnitCost 
           ,@Name 
           ,@Description 
           ,@ImageUrl 
           ,@CreatedBy 
           ,@ModifiedBy 
		   ,@Id OUTPUT

Select *
from dbo.MenuItems
--WHERE Id = @Id
Select *
from dbo.Users
*/

BEGIN

INSERT INTO [dbo].[MenuItems]
           ([OrganizationId]
           ,[OrderStatusId]
           ,[UnitCost]
           ,[Name]
           ,[Description]
           ,[ImageUrl]
           ,[CreatedBy]
           ,[ModifiedBy]
		   )
     VALUES
           (
		   @OrganizationId
           ,@OrderStatusId
           ,@UnitCost
           ,@Name
           ,@Description
           ,@ImageUrl
           ,@CreatedBy
           ,@ModifiedBy
		   )

	SET @Id = SCOPE_IDENTITY();
END


GO
