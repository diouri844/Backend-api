
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(400).json({ msg: "You are not authorized" });
    }

    const user = await Users.findOne({ _id: decoded.payload.id });
    req.user = user;
    next();
    // rather than binding the whole document we should bind _id or email only
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

export default auth;
