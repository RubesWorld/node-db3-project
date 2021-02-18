const db = require("../../data/db-config");

function find() {
  return db("schemes");
}

function findById(id) {
  return !id ? Promise.resolve(null) : db("schemes").where("id", id).first();
}

function findSteps(schemeId) {
  return db("steps as st")
    .join("schemes as s", "st.scheme_id", "s.id")
    .select("s.id", "s.scheme_name", "st.step_number", "st.instructions")
    .where("st.scheme_id", schemeId);
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(([id]) => {
      return db("schemes").where("id", id).first();
    });
}

function update(changes, id) {
  const newId = id;
  return (
    db("schemes")
      .where("id", id)
      .update(changes)
      // .then((res) => {
      //   findById(res[0]);
      // });
      .then((res) => {
        return db("schemes").where("id", newId).first();
      })
  );
}

function remove(id) {
  return db("schemes").where("id", id).del();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
