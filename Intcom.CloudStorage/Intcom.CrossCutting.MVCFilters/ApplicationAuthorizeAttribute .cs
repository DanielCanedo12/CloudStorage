using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Intcom.CrossCutting.MVCFilters
{
    public class ApplicationAuthorizeAttribute : AuthorizeAttribute
    {
        
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            base.HandleUnauthorizedRequest(filterContext);

            var httpContext = filterContext.HttpContext;
            var request = httpContext.Request;
            var response = httpContext.Response;
            var user = httpContext.User;

            if (request.IsAjaxRequest())
            {
                if (user.Identity.IsAuthenticated == false)
                {
                    if (httpContext.Request.HttpMethod == "GET")
                    {
                        filterContext.Result = new RedirectResult("/Login/Relogin?ReturnUrl=" + httpContext.Request.Url.ToString());
                    }
                    else
                    {
                        filterContext.Result = new RedirectResult("/Login/Relogin");
                    }
                    
                }
                else
                {
                    throw new HttpException((int)HttpStatusCode.Forbidden, "Forbidden");
                }
            }
            
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);

            var httpContext = filterContext.HttpContext;
            var response = httpContext.Response;

            if (httpContext.User.Identity.IsAuthenticated)
            {
                if (httpContext.Session == null || httpContext.Session["Login"] == null)
                {
                    filterContext.Result = new RedirectResult("/Login/Relogin?ReturnUrl=" + httpContext.Request.Url.ToString());
                    FormsAuthentication.RedirectToLoginPage();
                }
               
            }
        }
    }
}