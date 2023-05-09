import React, { useEffect, useState } from "react";
import { Row } from "antd";
import { getSubs } from "../../functions/sub";
import { Link } from "react-router-dom";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSubs();
  }, []);

  const loadSubs = async () => {
    try {
      setLoading(true);
      const res = await getSubs();

      setSubs(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const showSubs = () =>
    subs.map((s) => (
      <div key={s._id} className="btn btn-outline-secondary btn-lg btn-block m-3">
        <Link className="text-decoration-none text-reset" to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <Row className="text-center">{loading ? <h4>Loading...</h4> : showSubs()}</Row>
    </div>
  );
};

export default SubList;
