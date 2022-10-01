using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.MenuItems
{
    public  class OrganizationBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string SiteUrl { get; set; }

    }
}
