USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[MenuItems_Select_ByOrgId_Paged_Query]    Script Date: 9/27/2022 2:10:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Juan Asencio
-- Create date: 29Aug2022
-- Description:	A proc to page and Select MenuItems by OrganizationId, and query if necessary.
-- Code Reviewer: Ryu Matsu


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE proc [dbo].[MenuItems_Select_ByOrgId_Paged_Query]
--Select MenuItems by OrganizationId where IsDeleted = 0(false)
--Paginated
			
			@organizationId int 
			,@pageIndex int 
            ,@pageSize int
			,@query nvarchar (50) = ''

as
/*
Declare
			@organizationId int  = 1
			,@pageIndex int  = 0
            ,@pageSize int = 100
			,@query nvarchar(50) = 'cheeseburger'


Execute [dbo].[MenuItems_Select_ByOrgId_Paged_Query] @organizationId
										,@pageIndex  
                                        ,@pageSize 
										--,@query


Select *
from dbo.MenuItems
Select *
from dbo.MenuItemTags
Select *
from dbo.Tags

Select *
from dbo.FoodSafeTypes

*/
BEGIN

   Declare @offset int = @pageIndex * @pageSize

SELECT Distinct mi.Id
      ,mi.[OrganizationId]
	  ,o.Name
	  ,o.Logo
	  ,o.SiteUrl
      ,st.Id as StatusId 
	  ,st.Name as Status
      ,mi.[UnitCost]
      ,mi.[Name]
      ,mi.[Description]
      ,mi.[ImageUrl]
      ,mi.[CreatedBy]
      ,mi.[ModifiedBy]
      ,mi.[DateCreated]
      ,mi.[DateModified]
      ,mi.[IsDeleted]
	  ,mi.[IsPublished]
	  ,Ingredients = ( Select Distinct i.Id
							,i.Name
							,i.UnitCost
							,i.ImageUrl
							,i.CreatedBy
						From dbo.Ingredients as i inner join dbo.MenuItemIngredients as mii
									on  i.Id = mii.IngredientId
							Where mi.Id = mii.MenuItemId
						For JSON AUTO
						)
		,FoodSafeTypes = ( Select Distinct fst.Id
								 ,fst.Name
							From dbo.FoodSafeTypes as fst inner join dbo.DietaryRestrictions as dr
									on  fst.Id = dr.FoodSafeTypeId
							Where dr.MenuItemId = mi.Id
						For JSON AUTO
						)
	  , TotalCount = COUNT(1) OVER() 
  FROM dbo.MenuItems as mi 
		inner join dbo.Organizations as o
				on mi.OrderStatusId = o.Id
		inner join dbo.StatusTypes as st
				on mi.OrderStatusId = st.Id
		inner join dbo.Users as u
				on mi.CreatedBy = u.Id 
		inner join dbo.Users as u1 
				on mi.ModifiedBy = u1.Id
		

	Where mi.OrganizationId = @organizationId  AND mi.IsDeleted = 0  AND mi.IsPublished = 0 AND (mi.Name LIKE CONCAT('%',@query,'%') or @query = '') 
	
	ORDER BY mi.Id
		OFFSET @offSet Rows
	Fetch Next @pageSize Rows ONLY

END



GO
