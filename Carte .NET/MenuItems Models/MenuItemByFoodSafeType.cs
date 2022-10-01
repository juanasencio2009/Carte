using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.MenuItems
{
    public class MenuItemByFoodSafeType : MenuItem
    {
       
        public LookUp FoodSafeType { get; set; }
        public int MenuId { get; set; }
       
    }
}
