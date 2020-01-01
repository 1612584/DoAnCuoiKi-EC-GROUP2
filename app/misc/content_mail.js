module.exports = {
    bidSuccess: (link_product) => `<div style="display: flex;
                    justify-content: center;
                    margin-left: 300px
                    ">
                <div style="font-weight: lighter">
                <img src="https://cdn4.iconfinder.com/data/icons/success-filloutline/64/auction-Verdict-judge-law-gavel-512.png" atl="logo" width="150" height="150" style="margin-left: 77px;"/>
                <span style="font-size: 18px;
                            font-weight: bold;
                            display: inline-block;
                            margin-left: 30px">Thông báo lượt ra giá của bạn</span>
                <hr style="margin-bottom: 20px; "/>
                Xin chào
                <br/>
                Cảm ơn bạn đã đặt giá mua sản phẩm tại website <a href="${link_product}">sandaugia.com </a>!
                <br/><br/>
                Hệ thống xin thông báo lượt đấu giá của bạn thành công.
                <br/>

                <br/><br/>
                Good bye !!
                </div>
                </div>`,
    bidOver: (link_product) =>  `<div style="display: flex;
                            justify-content: center;
                            margin-left: 300px
                            ">
                        <div style="font-weight: lighter">
                        <img src="https://cdn4.iconfinder.com/data/icons/success-filloutline/64/auction-Verdict-judge-law-gavel-512.png" atl="logo" width="150" height="150" style="margin-left: 77px;"/>
                        <span style="font-size: 18px;
                                    font-weight: bold;
                                    display: inline-block;
                                    margin-left: 30px">Thông báo cuộc đấu giá của bạn</span>
                        <hr style="margin-bottom: 20px; "/>
                        Xin chào
                        <br/>
                        Cảm ơn bạn đã đặt giá mua sản phẩm tại website <a href="${link_product}">sandaugia.com </a>!
                        <br/><br/>
                        Hệ thống xin thông báo lượt đấu giá của bạn đã bị đối thủ vượt mặt.
                        <br/>

                        <br/><br/>
                        Good bye !!
                        </div>
                        </div>`,
    sellerHaveBidder: (link_product) => `<div style="display: flex;
                                justify-content: center;
                                margin-left: 300px
                                ">
                            <div style="font-weight: lighter">
                            <img src="https://cdn4.iconfinder.com/data/icons/success-filloutline/64/auction-Verdict-judge-law-gavel-512.png" atl="logo" width="150" height="150" style="margin-left: 77px;"/>
                            <span style="font-size: 18px;
                                        font-weight: bold;
                                        display: inline-block;
                                        margin-left: 30px">Thông báo thông tin đấu giá sản phẩm của bạn</span>
                            <hr style="margin-bottom: 20px; "/>
                            Xin chào
                            <br/>
                            Hệ thống xin thông báo, đã có một lượt đấu giá mới vào sản phẩm của bạn tại website <a href="${link_product}">sandaugia.com </a>!
                            <br/><br/>
                            Bạn có thể kiểm tra tại trang thông tin của mình. Xin cảm ơn.
                            <br/>

                            <br/><br/>
                            Good bye !!
                            </div>
                            </div>`
}