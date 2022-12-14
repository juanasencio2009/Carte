USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[MenuItems_Update]    Script Date: 8/30/2022 7:11:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Juan Asencio
-- Create date: 25Aug2022
-- Description:	A proc to Update by Id dbo.MenuItems.
-- Code Reviewer: Luis Rios


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[MenuItems_Update]
			@OrganizationId int
           ,@OrderStatusId int
           ,@UnitCost decimal(18,2)
           ,@Name nvarchar(100)
           ,@Description nvarchar(500)
           ,@ImageUrl nvarchar(255)
           ,@ModifiedBy int           
		   ,@Id int 
as
/*
Declare
			@OrganizationId int = 8
           ,@OrderStatusId int = 1
           ,@UnitCost decimal(18,2) = 15.50
           ,@Name nvarchar(100) = 'UpdatedMenuNameSQL'
           ,@Description nvarchar(500) = 'UdatedMenuDescriptionSQL'
           ,@ImageUrl nvarchar(255) = 'https://tinyurl.com/2p8w9fjn'
           ,@ModifiedBy int = 1
		   ,@Id int = 4

EXEC dbo.MenuItems_Update
			@OrganizationId 
           ,@OrderStatusId 
           ,@UnitCost 
           ,@Name 
           ,@Description 
           ,@ImageUrl 
           ,@ModifiedBy 
		   ,@Id  

Select *
from dbo.MenuItems
where Id = @Id;
*/
BEGIN

UPDATE [dbo].[MenuItems]
   SET [OrganizationId] = @OrganizationId
      ,[OrderStatusId] = @OrderStatusId
      ,[UnitCost] = @UnitCost
      ,[Name] = @Name
      ,[Description] = @Description
      ,[ImageUrl] = @ImageUrl
      ,[ModifiedBy] = @ModifiedBy
      ,[DateModified] = getutcdate()
     
 WHERE Id = @Id;
END


GO
