using System.Web.Optimization;

namespace Intcom.MVC.Site
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
#if !DEBUG
            BundleTable.EnableOptimizations = true;
#endif
           

            // login
            bundles.Add(new StyleBundle("~/Content/Pages/login").Include("~/Content/login.css"));
            bundles.Add(new ScriptBundle("~/Scripts/Pages/login").Include("~/Scripts/app/pages/login.js"));

           
            // GRIDS ---------------------------------------------------------
            bundles.Add(new ScriptBundle("~/Scripts/Grid/Campanhas").Include("~/Scripts/app/grids/campanhas.js"));


            // CSS   ---------------------------------------------------------
            // main
            bundles.Add(new ScriptBundle("~/Scripts/Site").Include(
                "~/Scripts/app/app.init.js",
                "~/Scripts/app/Modules/clear-storage.js",
                "~/Scripts/app/Modules/constants.js",
                "~/Scripts/app/Modules/sidebar.js",
                "~/Scripts/app/Modules/toggle-state.js"
            ));

            bundles.Add(new StyleBundle("~/Content/app").Include(
                "~/Content/app.css",
                "~/Content/mvc-override.css"
            ));

            // forms
            bundles.Add(new StyleBundle("~/Content/forms").Include(
                "~/Vendor/sweetalert/dist/sweetalert.css",
                "~/Vendor/chosen/chosen.min.css",
                "~/Vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css",
                "~/Vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css"
            ));

            bundles.Add(new ScriptBundle("~/Scripts/forms").Include(
                "~/Vendor/jquery-validation/dist/jquery.validate.min.js",
                "~/Vendor/jquery-validation/dist/jquery.validate.unobtrusive.min.js",
                "~/Vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js",
                "~/Scripts/app/modules/sendform.js",
                "~/Vendor/sweetalert/dist/sweetalert.min.js",
                "~/Vendor/chosen/chosen.min.js",
                "~/Vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js",
                "~/Vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js"
            ));

            // others
            bundles.Add(new ScriptBundle("~/Scripts/associar-pessoa").Include("~/Scripts/app/modules/associar-pessoa.js"));

            bundles.Add(new ScriptBundle("~/Scripts/busca-cep").Include("~/Scripts/app/modules/busca-cep.js"));
            
            bundles.Add(new ScriptBundle("~/Scripts/grid").Include("~/Scripts/app/modules/grid.js"));

            bundles.Add(new ScriptBundle("~/Scripts/autocomplete").Include("~/Scripts/app/modules/autocomplete.js"));

            // -- main vendor -----------------------------------------------------------------------

            // jquery
            bundles.Add(new ScriptBundle("~/Scripts/jquery").Include("~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/Scripts/jquery-ui").Include("~/Scripts/jquery-ui.min.js"));

            bundles.Add(new ScriptBundle("~/Scripts/jquery-storage").Include("~/Vendor/jQuery-Storage-API/jquery.storageapi.js"));

            // jquery.rateit
            bundles.Add(new StyleBundle("~/Content/jquery-rateit").Include("~/Vendor/jquery.rateit/rateit.css"));

            bundles.Add(new ScriptBundle("~/Scripts/jquery-rateit").Include("~/Vendor/jquery.rateit/jquery.rateit.min.js"));
            
            // Bootstrap
            bundles.Add(new StyleBundle("~/Content/bootstrap").Include("~/Content/bootstrap.css", new CssRewriteUrlTransform()));

            bundles.Add(new ScriptBundle("~/Scripts/bootstrap").Include(
                "~/Scripts/bootstrap.js"
            ));

            // -- Vendor Plugins --------------------------------------------------------------------
            bundles.Add(new StyleBundle("~/bundles/fontawesome").Include("~/Vendor/fontawesome/css/font-awesome.min.css", new CssRewriteUrlTransform()));

            bundles.Add(new StyleBundle("~/bundles/simpleLineIcons").Include("~/Vendor/simple-line-icons/css/simple-line-icons.css", new CssRewriteUrlTransform()));

            // animate css
            bundles.Add(new StyleBundle("~/bundles/animatecss").Include("~/Vendor/animate.css/animate.min.css"));

            // bootstrap-dateTimePicker
            bundles.Add(new StyleBundle("~/Content/date-picker").Include("~/Vendor/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css"));

            bundles.Add(new ScriptBundle("~/Scripts/date-picker").Include("~/Vendor/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"));

            // fileupload
            bundles.Add(new StyleBundle("~/Content/fileUploadCss").Include(
                "~/Vendor/blueimp-file-upload/css/jquery.fileupload.css",
                "~/Vendor/croppie-master/croppie.css"
            ));

            bundles.Add(new ScriptBundle("~/Scripts/fileUpload").Include(
                "~/Vendor/jquery-ui/ui/widget.js",
                "~/Vendor/blueimp-load-image/js/load-image.all.min.js",
                "~/Vendor/blueimp-canvas-to-blob/js/canvas-to-blob.js",
                "~/Vendor/blueimp-file-upload/js/jquery.iframe-transport.js",
                "~/Vendor/blueimp-file-upload/js/jquery.fileupload.js",
                "~/Vendor/blueimp-file-upload/js/jquery.fileupload-process.js",
                "~/Vendor/blueimp-file-upload/js/jquery.fileupload-image.js",
                "~/Vendor/blueimp-file-upload/js/jquery.fileupload-audio.js",
                "~/Vendor/blueimp-file-upload/js/jquery.fileupload-video.js",
                "~/Vendor/blueimp-file-upload/js/jquery.fileupload-validate.js",
                "~/Vendor/blueimp-file-upload/js/jquery.fileupload-ui.js",
                "~/Vendor/croppie-master/croppie.min.js"
            ));

            // flexText
            bundles.Add(new StyleBundle("~/Content/flex-text").Include("~/Vendor/flex-text/flex-text.css"));

            bundles.Add(new ScriptBundle("~/Scripts/flex-text").Include(
                "~/Vendor/flex-text/flex-text.min.js"
            ));

            // fullcalendar
            bundles.Add(new StyleBundle("~/Content/fullcalendario").Include("~/Content/fullcalendar/fullcalendar.min.css"));

            bundles.Add(new ScriptBundle("~/Scripts/fullcalendar").Include(
                "~/Vendor/fullcalendar/dist/fullcalendar.min.js",
                "~/Vendor/fullcalendar/dist/lang-all.js"
            ));

            //datatable
            bundles.Add(new StyleBundle("~/Content/datatables").Include("~/Vendor/datatables/datatables.min.css"));

            bundles.Add(new ScriptBundle("~/Scripts/datatables").Include("~/Vendor/datatables/datatables.min.js"));

            // moment
            bundles.Add(new ScriptBundle("~/Scripts/moment").Include("~/Vendor/moment/min/moment-with-locales.min.js"));

            // simpleWeather
            bundles.Add(new ScriptBundle("~/Scripts/simpleWeather").Include("~/Vendor/simple-weather/js/jquery.simpleWeather.min.js"));

            // sparkline
            bundles.Add(new ScriptBundle("~/Scripts/sparkline").Include("~/Vendor/sparkline/index.js"));

            // steps
            bundles.Add(new ScriptBundle("~/Scripts/jquery-steps").Include("~/Vendor/jquery.steps/build/jquery.steps.js"));

            // template
            bundles.Add(new ScriptBundle("~/Scripts/tmpl").Include("~/Vendor/blueimp-tmpl/js/tmpl.js"));

            // whirl
            bundles.Add(new StyleBundle("~/Content/whirl").Include("~/Vendor/whirl/dist/whirl.min.css"));

            // tinysort
            bundles.Add(new ScriptBundle("~/Scripts/tinysort").Include("~/Vendor/tinysort/tinysort.min.js"));

            //Date.js
            bundles.Add(new ScriptBundle("~/Scripts/date").Include(
                "~/Vendor/date/build/date.js",
                "~/Vendor/date/build/date-pt-BR.js"));
        }
    }
}
