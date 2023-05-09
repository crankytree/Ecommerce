import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserNav from "../../components/nav/UserNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getWishlist, removeWishlist } from "../../functions/user";
import { DeleteOutlined } from "@ant-design/icons";

const WishList = () => {
  const { user } = useSelector((state) => state);

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async (req, res) => {
    try {
      const res = await getWishlist(user.token);
      setWishlist(res.data.wishlist);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data?.message);
    }
  };

  const removeHandler = async (productId) => {
    try {
      const res = await removeWishlist(productId, user.token);
      toast.error("Removed Product from wishlist");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data?.message);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>WishList</h4>

          {wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span onClick={() => removeHandler(p._id)} className="btn bth-sm float-end">
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;
