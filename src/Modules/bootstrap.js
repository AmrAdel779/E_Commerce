import { addressRouter } from "./Address/address.routes.js"
import { authRouter } from "./Auth/Auth.routes.js"
import { brandRouter } from "./brands/brands.routes.js"
import { cartRouter } from "./Cart/cart.routes.js"
import { categoryRouter } from "./Categories/categories.routes.js"
import { couponRouter } from "./Coupon/coupon.routes.js"
import { orderRouter } from "./Order/Order.routes.js"
import { productRouter } from "./products/products.routes.js"
import { reviewRouter } from "./review/review.routes.js"
import { subCategoryRouter } from "./subCategories/subCategory.routes.js"
import { UserRouter } from "./Users/user.routes.js"
import { wishListRouter } from "./wishList/wishList.routes.js"
const bootstrap = (app) => {
    app.use("/api/categories", categoryRouter)
    app.use("/api/subCategories", subCategoryRouter)
    app.use("/api/brands", brandRouter)
    app.use("/api/products", productRouter)
    app.use("/api/users", UserRouter)
    app.use("/api/auth", authRouter)
    app.use("/api/Review", reviewRouter)
    app.use("/api/addToWishList", wishListRouter)
    app.use("/api/address", addressRouter)
    app.use("/api/coupon", couponRouter)
    app.use("/api/cart", cartRouter)
    app.use("/api/order", orderRouter)

}
export {
    bootstrap
}