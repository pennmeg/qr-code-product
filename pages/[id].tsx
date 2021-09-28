import Image from "next/image";
import { useEffect, useState } from "react";
import { data2, data1 } from "./api/mock_data.js";
import styles from "../styles/Product.module.css";

type ProductTags = {
  id: string;
  sku: string;
  name: string;
  variant?: string;
  ageRestricted: boolean;
  details?: object;
};

const Product = (id: { id: number }) => {
  const [error, setError] = useState<boolean>(false);

  // useEffect(() => {
  // NOTE:
  // Continued to get CORS errors using this URL when working locally
  // After significant time decided to instead mock data and continue with technical
  //   fetch(`https://fir-hosting-app-clip.web.app/.well-known/api/${id}.json`)
  //     .then((response) => response.text())
  //     .then((data) => {
  //       console.log("--- data", JSON.parse(data));
  //     })
  //     .catch((error) => {
  //       setError(true);
  //       console.log("--- error", error);
  //     });
  // }, [id]);

  const productTag = data2.tag ?? {};

  if (error)
    return (
      <div style={{ padding: 10 }}>
        <h1 style={{ textAlign: "center" }}>Oops!</h1>
        <p style={{ textAlign: "center" }}>
          Trouble fetching this product please try again later.
        </p>
      </div>
    );

  function getTags(product: ProductTags) {
    const hasDetails = product.details ? Object.values(product?.details) : [];
    const ageRestrictedUi = product.ageRestricted && "18+";

    let tags = [...hasDetails, ageRestrictedUi, product?.variant];
    tags = tags.filter(Boolean);

    return tags.map((tag, index) => {
      return (
        <div key={index} className={styles.tag}>
          <p>{tag}</p>
        </div>
      );
    });
  }

  return (
    <div className={styles.product}>
      <div className={styles.imageBackground}>
        <Image
          alt={productTag.product.name}
          src={productTag.product.image}
          layout="fill"
        />
      </div>
      <div className={styles.productDetails}>
        <h1 className={styles.productName}>
          {productTag.product.name}
          {productTag.brand.name && (
            <span style={{ fontSize: 16 }}> by {productTag.brand.name}</span>
          )}
        </h1>
        <p style={{ fontSize: 10 }}>SKU: {productTag.product.sku}</p>
        <div style={{ display: "flex" }}>{getTags(productTag.product)}</div>
      </div>
    </div>
  );
};

export default Product;
