using System.Web.Mvc;
using Intcom.CrossCutting.MVCFilters;

namespace Intcom.MVC.Site.Controllers
{
    [ApplicationAuthorize]
    public abstract class _GlobalController : Controller
    {
     
        protected override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
        }
    }
}