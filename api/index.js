export default function (req, res, next) {
  // Get the session ID:

  // Assign some value to session:
  if (req.query && req.query.date) {
    req.session = {...req.session, ...req.query}
  }

  next();
}
