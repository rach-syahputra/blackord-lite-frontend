const validate = (schema, data) => {
  const validation = schema.safeParse(data)

  if (!validation.success) {
    return validation.error.issues[0].message
  }
}

export default validate
