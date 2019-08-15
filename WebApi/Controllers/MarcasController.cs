using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using WebApi.Models;

namespace WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MarcasController : ApiController
    {
        private LocacaoDB db = new LocacaoDB();

        // GET: api/Marcas
        public IQueryable<Marcas> GetMarcas()
        {
            return db.Marcas;
        }

        // GET: api/Marcas/5
        [ResponseType(typeof(Marcas))]
        public IHttpActionResult GetMarcas(int id)
        {
            Marcas marcas = db.Marcas.Find(id);
            if (marcas == null)
            {
                return NotFound();
            }

            return Ok(marcas);
        }

        // PUT: api/Marcas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMarcas(int id, Marcas marcas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != marcas.Id)
            {
                return BadRequest();
            }

            db.Entry(marcas).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarcasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Marcas
        [ResponseType(typeof(Marcas))]
        public IHttpActionResult PostMarcas(Marcas marcas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Marcas.Add(marcas);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = marcas.Id }, marcas);
        }

        // DELETE: api/Marcas/5
        [ResponseType(typeof(Marcas))]
        public IHttpActionResult DeleteMarcas(int id)
        {
            Marcas marcas = db.Marcas.Find(id);
            if (marcas == null)
            {
                return NotFound();
            }

            db.Marcas.Remove(marcas);
            db.SaveChanges();

            return Ok(marcas);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MarcasExists(int id)
        {
            return db.Marcas.Count(e => e.Id == id) > 0;
        }
    }
}