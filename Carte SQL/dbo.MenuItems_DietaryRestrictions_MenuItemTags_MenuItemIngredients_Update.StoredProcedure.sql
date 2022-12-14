USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[MenuItems_DietaryRestrictions_MenuItemTags_MenuItemIngredients_Update]    Script Date: 9/30/2022 8:34:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Juan Asencio
-- Create date: 21Sep2022
-- Description:	A proc to UPDATE MenuItems, DietaryRestrictions, MenuItemTags, and MenuItemIngredients.
-- Code Reviewer:


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[MenuItems_DietaryRestrictions_MenuItemTags_MenuItemIngredients_Update]

	@MenuItemId int 
	,@OrganizationId int
	,@OrderStatusId int
	,@UnitCost decimal(18,2)
	,@Name nvarchar(100)
	,@Description nvarchar(500)
	,@ImageUrl nvarchar(255)
	,@ModifiedBy int           
	,@DietRestrictionList dbo.Id_List READONLY
	,@TagList dbo.Id_List READONLY 
	,@IngredientsList dbo.Id_List READONLY
	,@CreatedBy int           

as
/*
Declare
		@OrganizationId int = 1
		,@OrderStatusId int = 1
		,@UnitCost decimal(18,2) = 16.50
		,@Name nvarchar(100) = 'UpdatedAllItems SQL'
		,@Description nvarchar(500) = 'UdateAllItems SQL'
		,@ImageUrl nvarchar(255) = 'https://tinyurl.com/2p8w9fjn'
		,@ModifiedBy int = 1
		,@MenuItemId int = 1
		,@FoodSafeTypeId int = 2
		,@TagId int = 2
		,@IngredientId int = 31
		,@DietRestrictionList dbo.Id_List 
		,@TagList dbo.Id_List
		,@IngredientsList dbo.Id_List 
		,@CreatedBy int = 1       

	INSERT INTO @DietRestrictionList
		(Id)
	VALUES
		(1)
		,(2)
		,(3)
	INSERT INTO @TagList
		(Id)
	VALUES
		(2)
		,(6)
	INSERT INTO @IngredientsList
		(Id)
	VALUES
		(141)
		,(142)

	EXEC dbo.MenuItems_DietaryRestrictions_MenuItemTags_MenuItemIngredients_Update
		@MenuItemId  
		,@OrganizationId 
		,@OrderStatusId 
		,@UnitCost 
		,@Name 
		,@Description 
		,@ImageUrl 
		,@ModifiedBy 
		,@DietRestrictionList
		,@TagList 
		,@IngredientsList 
		,@CreatedBy 
	
	Select *
	from dbo.MenuItems
	--where Id = @MenuItemId;
	Select *
	from dbo.DietaryRestrictions
	--where MenuItemId = @MenuItemId;
	SELECT * 
	FROM dbo.MenuItemTags
	--where MenuItemId = @MenuItemId;
	SELECT * 
	FROM dbo.MenuItemIngredients
	--where MenuItemId = @MenuItemId;
*/

BEGIN

	UPDATE	[dbo].[MenuItems]
	SET [OrganizationId] = @OrganizationId
		,[OrderStatusId] = @OrderStatusId
		,[UnitCost] = @UnitCost
		,[Name] = @Name
		,[Description] = @Description
		,[ImageUrl] = @ImageUrl
		,[ModifiedBy] = @ModifiedBy
		,[DateModified] = getutcdate()
	WHERE Id = @MenuItemId;

	------------------------------------------

	DELETE
	FROM dbo.DietaryRestrictions  --(for editing FoodSafeTypes)
	WHERE MenuItemId = @MenuItemId

	INSERT INTO dbo.DietaryRestrictions
		(MenuItemId
		,FoodSafeTypeId)
	SELECT 
		@MenuItemId
		,Id
	FROM @DietRestrictionList

	------------------------------------------

	DELETE
	FROM dbo.MenuItemTags
	WHERE MenuItemId = @MenuItemId

	INSERT INTO dbo.MenuItemTags
		(MenuItemId
		,TagId
		,CreatedBy
		)
	SELECT 
		@MenuItemId
		,Id
		,@CreatedBy
	FROM @TagList

	-----------------------------------------

	DELETE
	FROM dbo.MenuItemIngredients
	WHERE MenuItemId = @MenuItemId

	INSERT INTO dbo.MenuItemIngredients
		(MenuItemId
		,IngredientId
		,CreatedBy
		)
	SELECT 
		@MenuItemId
		,Id
		,@CreatedBy
	FROM @IngredientsList

	--------------------------------------------

	DELETE
	FROM dbo.MenuItemIngredients
	WHERE MenuItemId = @MenuItemId

	INSERT INTO dbo.MenuItemIngredients
		(MenuItemId
		,IngredientId
		,CreatedBy
		)
	SELECT 
		@MenuItemId
		,Id
		,@CreatedBy
	FROM @IngredientsList
				
END



GO
