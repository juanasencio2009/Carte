using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Web;
using Sabio.Web.Controllers;
using Sabio.Services;
using Sabio.Models.Domain.MenuItems;
using Sabio.Models.Requests;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.MenuItems;
using Sabio.Services.Interfaces;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/menuitems")]
    [ApiController]
    public class MenuItemsApiController : BaseApiController
    {
        private IMenuItemsService _service = null;
        private IAuthenticationService<int> _authService = null;
        public MenuItemsApiController(IMenuItemsService service, ILogger<MenuItemsApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<MenuItem>> Get(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                MenuItem menuItem = _service.Get(id);

                if (menuItem == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<MenuItem> { Item = menuItem };
                }
            }
            catch (Exception ex)
            {

                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);

        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add( MenuItemAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }
        [HttpPost("add/all")]
        public ActionResult<ItemResponse<int>> AddAllItems(MenuItemAddAllRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddAllItems(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(MenuItemUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();  
                _service.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        [HttpPut("update/all/{id:int}")]
        public ActionResult<SuccessResponse> UpdateAllItems(MenuItemUpdateAllRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateAllItems(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> MenuItemDeleteById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.MenuItemDeleteById(id, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("ingredients/{id:int}")]
        public ActionResult<ItemsResponse<List<MenuItem>>> GetAllMenuItemsByIngredientId(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<MenuItem> list = _service.GetByIngredientId( id);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<MenuItem> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);

        }


        [HttpDelete("ingredients/{id:int}")]
        public ActionResult<SuccessResponse> MenuItemIngredientsDeleteById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.MenuItemIngredientsDeleteById(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpGet("foodsafetypes")]
        public ActionResult<ItemsResponse<LookUp>> GetAllFoodSafeTypes(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<LookUp> list = _service.GetAllFoodSafeTypes(pageIndex, pageSize);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<LookUp> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("foodsafetypes/menu/{id:int}")]
        public ActionResult<ItemResponse<List<MenuItem>>> GatAllMenuItemByFoodSafeTypeId(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<MenuItem> list = _service.MenuItemByFoodSafeTypeId(id);

                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<List<MenuItem>> { Item = list };
                }
            }
            catch (Exception ex)
            {

                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);

        }

        [HttpGet("organization/paged/{id:int}")]
        public ActionResult<ItemResponse<Paged<MenuItem>>> GetPagedQueryByOrgId(int id, int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                //int orgId = _orgService.GetUsersAssignedOrgId(userId);  //orgId //DO NOT DELETE, THIS IS FOR NEW PR
                Paged<MenuItem> page = _service.GetPagedQueryByOrgId( id, pageIndex, pageSize, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<MenuItem>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);

        }
        [HttpGet("organization/{id:int}")]
        public ActionResult<ItemResponse<List<MenuItem>>> GetAllByOrgId(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                //int orgId = _orgService.GetUsersAssignedOrgId(userId);  //orgId //DO NOT DELETE, THIS IS FOR NEW PR
                List<MenuItem> list = _service.GetAllByOrgId(id);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<List<MenuItem>> { Item = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);

        }

        [HttpGet("current/{id:int}")]
        public ActionResult<ItemResponse<Paged<MenuItem>>> GetByCreatedBy(  int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int id = _authService.GetCurrentUserId();
                Paged<MenuItem> page = _service.GetByCreatedBy(id, pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<MenuItem>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);

        }
    }

}

