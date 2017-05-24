using Microsoft.WindowsAzure.Storage;
using Microsoft.Azure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using Microsoft.WindowsAzure.Storage.Blob;

namespace IntCom.MVC.Site.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {

           
            return View();
        }
    }
}