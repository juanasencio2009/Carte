using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.MenuItems;
using Sabio.Models.Ingredients;
using Sabio.Models.Requests;
using Sabio.Models.Requests.MenuItems;
using Sabio.Services.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class MenuItemsService : IMenuItemsService
    {
        IDataProvider _data = null;
        public MenuItemsService(IDataProvider data)
        {
            _data = data;
        }

        public MenuItem Get(int id)
        {
            string procName = "[dbo].[MenuItems_Select_ById]";
            MenuItem menuItem = null;


            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                menuItem = MenuItemMapper(reader, ref startingIndex);

            });
            return menuItem;
        }

        public int Add(MenuItemAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[MenuItems_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                Payload(model, userId, col);
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@ModifiedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object returnId = returnCollection["@Id"].Value;

                int.TryParse(returnId.ToString(), out id);
            });

            return id;
        }
        public int AddAllItems(MenuItemAddAllRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[MenuItems_DietaryRestrictions_MenuItemTags_MenuItemIngredients_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                PayloadForAll(model, col);
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@ModifiedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object returnId = returnCollection["@Id"].Value;

                int.TryParse(returnId.ToString(), out id);
            });

            return id;
        }

        public void Update(MenuItemUpdateRequest model, int userId)
        {
            string procName = "[dbo].[MenuItems_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                Payload(model, userId, col);
                col.AddWithValue("@ModifiedBy", userId);
                col.AddWithValue("@MenuItemId", model.Id);

            }, returnParameters: null);
        }
        public void UpdateAllItems(MenuItemUpdateAllRequest model, int userId)
        {
            string procName = "[dbo].[MenuItems_DietaryRestrictions_MenuItemTags_MenuItemIngredients_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                PayloadForAll(model, col);
                col.AddWithValue("@CreatedBy", userId);//NOTE: required for bridge tables
                col.AddWithValue("@ModifiedBy", userId);//NOTE: required for dbo.MenuItems table
            col.AddWithValue("@MenuItemId", model.MenuItemId);

            }, returnParameters: null);
        }

        public void MenuItemDeleteById(int id, int userId)
        {//this proc updates the IsDeleted colomn to 1(True)

            string procName = "[dbo].[MenuItems_Delete_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@ModifiedBy", userId);
                col.AddWithValue("@Id", id);

            }, returnParameters: null);
          
        }
        public List<MenuItem>  GetByIngredientId(int id)
        {
            string procName = "[dbo].[MenuItems_Select_ByIngredientId]";
            List<MenuItem> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@ingredientId", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                MenuItem menuItem = MenuItemMapper(reader, ref startingIndex);
               
                if (list == null)
                {
                    list = new List<MenuItem>();
                }

                list.Add(menuItem);
            });
            return list;
        }

        public void MenuItemIngredientsDeleteById(int id)
        {
            string procName = "[dbo].[MenuItemIngredients_Delete_ById]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@MenuItemId", id);

            }, returnParameters: null);

        }
        
       

        public List<LookUp> GetAllFoodSafeTypes(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[FoodSafeTypes_SelectAll]";
            List<LookUp> list = null;
            int totalCount = 0;


            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@pageIndex", pageIndex);
                paramCollection.AddWithValue("@pageSize", pageSize);

            },delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                LookUp food = new LookUp();

                food.Id = reader.GetSafeInt32(startingIndex++);
                food.Name = reader.GetSafeString(startingIndex++);
                totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<LookUp>();
                }

                list.Add(food);
            });

            return list;
        }
        public List<MenuItem> MenuItemByFoodSafeTypeId(int id)
        {
            string procName = "[dbo].[MenuItems_Select_ByFoodSafeTypesId]";
            List<MenuItem> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@FoodSafeTypeId", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                MenuItem menuItem = MenuItemMapper(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<MenuItem>();
                }

                list.Add(menuItem);
            });
            return list;
        }

        public Paged<MenuItem> GetPagedQueryByOrgId(int id, int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[MenuItems_Select_ByOrgId_Paged_QueryV2]";
            Paged<MenuItem> pagedList = null;
            List<MenuItem> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@organizationId", id);
                paramCollection.AddWithValue("@pageIndex", pageIndex);
                paramCollection.AddWithValue("@pageSize", pageSize);
                paramCollection.AddWithValue("@query", query);


            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                MenuItem menuItem = MenuItemMapper(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null) { list = new List<MenuItem>(); }
                list.Add(menuItem);
            });
            if (list != null)
            {
                pagedList = new Paged<MenuItem>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public List<MenuItem> GetAllByOrgId(int id)
        {
            string procName = "[dbo].[MenuItems_SelectAll_ByOrgId]";
          
            List<MenuItem> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@organizationId", id);
               


            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                MenuItem menuItem = MenuItemMapper(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null) { list = new List<MenuItem>(); }
                list.Add(menuItem);
            });
         
            return list;
        }

        public Paged<MenuItem> GetByCreatedBy(int id, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[MenuItems_Select_ByCreatedBy]";
            Paged<MenuItem> pagedList = null;
            List<MenuItem> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@createdBy", id);
                paramCollection.AddWithValue("@pageIndex", pageIndex);
                paramCollection.AddWithValue("@pageSize", pageSize);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                MenuItem menuItem = MenuItemMapper(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null) { list = new List<MenuItem>(); }
                list.Add(menuItem);
            });
            if (list != null)
            {
                pagedList = new Paged<MenuItem>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }



        private static MenuItem MenuItemMapper(IDataReader reader, ref int startingIndex)
        {

            
            MenuItem menuItem = new MenuItem();
            menuItem.Organization = new Models.Domain.MenuItems.OrganizationBase();
            menuItem.OrderStatus = new LookUp();
            List<Ingredient> menuIngredients = new List<Ingredient>();
            List<LookUp> menuFoodSafeType = new List<LookUp>();

            menuItem.Id = reader.GetSafeInt32(startingIndex++);
            menuItem.Organization.Id = reader.GetSafeInt32(startingIndex++);
            menuItem.Organization.Name = reader.GetSafeString(startingIndex++);
            menuItem.Organization.Logo = reader.GetSafeString(startingIndex++);
            menuItem.Organization.SiteUrl = reader.GetSafeString(startingIndex++);
            menuItem.OrderStatus.Id = reader.GetSafeInt32(startingIndex++);
            menuItem.OrderStatus.Name = reader.GetSafeString(startingIndex++);
            menuItem.UnitCost = reader.GetSafeDecimal(startingIndex++);
            menuItem.Name = reader.GetSafeString(startingIndex++);
            menuItem.Description = reader.GetSafeString(startingIndex++);
            menuItem.ImageUrl = reader.GetSafeString(startingIndex++);
            menuItem.CreatedBy = reader.GetSafeInt32(startingIndex++);
            menuItem.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            menuItem.DateCreated = reader.GetSafeDateTime(startingIndex++);
            menuItem.DateModified = reader.GetSafeDateTime(startingIndex++);
            menuItem.IsDeleted = reader.GetSafeBool(startingIndex++);
            menuItem.IsPublic = reader.GetSafeBool(startingIndex++);

            menuItem.Tags = reader.DeserializeObject<List<LookUp>>(startingIndex++);
            menuItem.MenuIngredients = reader.DeserializeObject<List<Ingredient>>(startingIndex++);
            menuItem.MenuFoodSafeType = reader.DeserializeObject<List<LookUp>>(startingIndex++);

            return menuItem;
        }

        private static void Payload(MenuItemAddRequest model, int userId, SqlParameterCollection col)
        {
            col.AddWithValue("@OrganizationId", model.OrganizationId);
            col.AddWithValue("@OrderStatusId", model.OrderStatusId);
            col.AddWithValue("@UnitCost", model.UnitCost);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
                      
        }
        private static void PayloadForAll(MenuItemAddAllRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@OrganizationId", model.OrganizationId);
            col.AddWithValue("@OrderStatusId", model.OrderStatusId);
            col.AddWithValue("@UnitCost", model.UnitCost);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@FoodSafeTypeId", model.FoodSafeTypeId);
            col.AddWithValue("@TagId", model.TagId);
            col.AddWithValue("@IngredientId", model.IngredientId);
        
        }

    }
}
