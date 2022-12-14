USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[MenuItems_Delete_ById]    Script Date: 8/30/2022 7:11:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Juan Asencio
-- Create date: 25Aug2022
-- Description:	A proc to Delete by Id(Update the IsDeleted column) dbo.MenuItems.
-- Code Reviewer: Luis Rios


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[MenuItems_Delete_ById]
--DeleteById UPDATES the IsDeleted and the ModifiedBy column. 
--@IsDeleted with DATATYPE bit(0=false and 1=true). BOOLEAN doesnt work as a datatype.

		  @ModifiedBy int
		  --,@IsDeleted bit
		  ,@Id int 
as
/*
Declare
		 @ModifiedBy int = 1 
		--,@IsDeleted bit = 0
		,@Id int = 37

Execute dbo.MenuItems_Delete_ById @ModifiedBy
								 --,@IsDeleted
								 ,@Id 

Select *
from dbo.MenuItems
*/
BEGIN

	UPDATE [dbo].[MenuItems]
	   SET 
		  [ModifiedBy] = @ModifiedBy
		  ,[DateModified] = getutcdate()
		  ,[isDeleted] = 1
	WHERE Id = @Id

END


GO
