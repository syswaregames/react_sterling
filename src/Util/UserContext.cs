using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class UserContext
    {
        public IHttpContextAccessor context;
        public float timezone;
        public int id_company { get {
            if(_id_company==-1) {
                throw new Exception("Id company not found. Please set id_company header");
            }
            return _id_company;
        }}
    
        private int _id_company = -1;
        public string id_user;

        public UserContext(IHttpContextAccessor context)
        {
            this.context = context;
            var tz = this.context.HttpContext.Request.Headers["timezone"];
            timezone = tz.Count > 0 ? Convert.ToInt32(tz[0].ToString()) : 0f;
            var company = this.context.HttpContext.Request.Headers["company"];
            _id_company = company.Count > 0 ? Convert.ToInt32(company[0]) : -1;
            id_user = this.context.HttpContext.User.FindFirst("id")?.Value;
        }

        public void SetCompany(int id)
        {
            _id_company = id;
        }
    }
}