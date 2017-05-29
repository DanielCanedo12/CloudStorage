using System;
using System.Collections.Generic;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;

namespace Intcom.MVC.Site.Controllers
{
    [AllowAnonymous]
    public class LoginController : Controller
    {
       /*rivate readonly UsuarioApplication _usuarioApplication;
        private readonly PessoaApplication _pessoaApplication;
        private readonly PerfilApplication _perfilApplication;

        public LoginController(PerfilApplication perfilFotoApplication, UsuarioApplication usuarioApplication, PessoaApplication paginaApplication)
        {
            _usuarioApplication = usuarioApplication;
            _pessoaApplication = paginaApplication;
            _perfilApplication = perfilFotoApplication;
        }*/

        // GET: Login
        public ActionResult Index()
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                return RedirectToAction("", "Home");
            }

            return View();
        }


        /*
        [HttpGet]
        public ActionResult Relogin()
        {
            int id;
            if (int.TryParse(HttpContext.User.Identity.Name, out id))
            {
                return Login(_pessoaApplication.GetInfoById(id), true);
            }
            else
            {
                if (Request.IsAjaxRequest())
                {
                    Response.Clear();
                    Response.Write(JsonConvert.SerializeObject(new { sucesso = true, needLogin = true }));
                    Response.ContentType = "application/json";
                    return new HttpStatusCodeResult(HttpStatusCode.Forbidden);
                }
                else
                {
                    return RedirectToAction("", "Login");
                }
            }
        }

        [NonAction]
        private ActionResult Login(Pessoa pessoa, bool remember)
        {
            if (pessoa == null)
            {
                if (Request.IsAjaxRequest())
                {
                    return new ContentResult
                    {
                        ContentType = "application/json",
                        Content = JsonConvert.SerializeObject(new { errors = new { Login = "Login e/ou senha incorretos" } })
                    };
                }
                else
                {
                    FormsAuthentication.RedirectToLoginPage("err=Login e/ou senha incorretos");
                    return null;
                }
            }

            PessoaViewModel pessoaViewModel = Mapper.Map<Pessoa, PessoaViewModel>(pessoa);

            if (pessoaViewModel != null)
            {
                Session.Add("Login", pessoaViewModel);
                Session.Add("Pessoa", pessoa);
                Session.Add("Acesso", Mapper.Map<IEnumerable<Pagina>, List<PaginaViewModel>>(_pessoaApplication.GetPaginas(pessoa)));

                try
                {
                    //FormsAuthentication.SetAuthCookie(Login.pessoa.idPessoa.ToString(), log.Remember);
                    FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, //version
                        pessoaViewModel.IdPessoa.ToString(),
                        DateTime.Now,
                        DateTime.Now.AddDays(15),
                        remember,
                        string.Empty
                    );

                    // Encrypt the ticket.
                    string encTicket = FormsAuthentication.Encrypt(ticket);

                    HttpCookie authenticationCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);

                    if (remember)
                    {
                        authenticationCookie.Expires = ticket.Expiration;
                    }

                    // Create the cookie.
                    Response.Cookies.Add(authenticationCookie);

                    // CRIAR AQUI UM SISTEMA DE SESSÕES, PARECIDO COM O FACEBOOK

                    var redir = FormsAuthentication.GetRedirectUrl(
                        pessoaViewModel.IdPessoa.ToString(),
                        remember
                    );
                    if (Request.IsAjaxRequest())
                    {
                        return new ContentResult
                        {
                            ContentType = "application/json",
                            Content = JsonConvert.SerializeObject(new { sucesso = true, redirect = redir })
                        };
                    }
                    else
                    {
                        Response.Redirect(redir);
                        Response.End();
                        return null;
                    }
                }
                catch
                {
                    if (Request.IsAjaxRequest())
                    {
                        return new ContentResult
                        {
                            ContentType = "application/json",
                            Content = JsonConvert.SerializeObject(new { errors = new { Login = "Não foi possível efetuar o login neste momento. Tente novamente mais tarde." } })
                        };
                    } 
                    else
                    {
                        FormsAuthentication.RedirectToLoginPage("err=Não foi possível efetuar o login neste momento. Tente novamente mais tarde.");
                        return null;
                    }
                }
            }
            else
            {
                if (Request.IsAjaxRequest())
                {
                    return new ContentResult
                    {
                        ContentType = "application/json",
                        Content = JsonConvert.SerializeObject(new { errors = new { Login = "Login e/ou senha incorretos" } })
                    };
                }
                else
                {
                    FormsAuthentication.RedirectToLoginPage("err=Login e/ou senha incorretos");
                    return null;
                }
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(LoginViewModel log)
        {   
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                return new ContentResult
                {
                    ContentType = "application/json",
                    Content = JsonConvert.SerializeObject(new { errors = new { Login = "Já autenticado" } })
                };
            }

            if (ModelState.IsValid)
            {
                return Login(_usuarioApplication.ValidarUsuario(log.User, log.Pass), log.Remember);
            }
            else
            {
                return new ContentResult
                {
                    ContentType = "application/json",
                    Content = JsonConvert.SerializeObject(new { errors = new { Login = "Login e/ou senha incorretos" } })
                };
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Email(string User)
        {
            Pessoa pessoa = _usuarioApplication.GetInfoByEmail(User);

            if (pessoa != null)
            {
                return new ContentResult
                {
                    ContentType = "application/json",
                    Content = JsonConvert.SerializeObject(new { sucesso = true, nome = pessoa.NomeCompleto, foto = (pessoa.Avatar != null) ? pessoa.Avatar.Path : null } )
                };
            }
            else
            {
                return new ContentResult
                {
                    ContentType = "application/json",
                    Content = JsonConvert.SerializeObject(new { errors = new { Login = "Não foi possível efetuar o login neste momento. Tente novamente mais tarde." } })
                };
            }
        }*/
    }
}