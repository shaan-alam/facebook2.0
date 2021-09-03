import Button from "../../components/Button";

const Profile = () => {
  return (
    <>
      <div className="flex flex-col items-center h-1/2 shadow-md">
        <div className="awesome-bg relative mx-auto w-full lg:w-3/4 h-96 justify-center items-end z-10">
          <img
            src="https://scontent.fknu1-2.fna.fbcdn.net/v/t1.6435-9/p720x720/48426632_764502247253446_6953128864801357824_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=e3f864&_nc_ohc=cKPvwQiherwAX-DAUdu&_nc_ht=scontent.fknu1-2.fna&oh=c4e877ca013e2934a768f4f42c93aafa&oe=6154ED41"
            alt="Cover Cicture"
            className="mx-auto w-full h-full object-cover rounded-b-lg"
          />
          <img
            src="https://scontent.fknu1-2.fna.fbcdn.net/v/t1.6435-1/c0.33.200.200a/p200x200/79597679_1011806192523049_5924937106005688320_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=4B1NusLw04gAX8v_MgO&tn=PvADey7lODyy414G&_nc_ht=scontent.fknu1-2.fna&oh=f8273c580f9b2558b216f90752192678&oe=6157F5CB"
            alt="Profile Picture"
            className="border-4 border-white rounded-full absolute -bottom-3 left-1/2 right-1/2 transform -translate-x-1/2"
          />
        </div>
        <div
          className="w-full h-1/2"
          style={{
            background:
              'url("https://scontent.fknu1-2.fna.fbcdn.net/v/t1.6435-9/p720x720/48426632_764502247253446_6953128864801357824_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=e3f864&_nc_ohc=cKPvwQiherwAX-DAUdu&_nc_ht=scontent.fknu1-2.fna&oh=c4e877ca013e2934a768f4f42c93aafa&oe=6154ED41"',
            backdropFilter: "4",
            filter: "blur(2px)",
          }}
        ></div>
        <div className="w-full text-center">
          <h1 className="font-bold text-4xl mt-4">Shaan Alam</h1>
          <a href="#!" className="text-fb font-bold mt-4 inline-block">
            Add Bio
          </a>
        </div>
        <div
          className="bg-gray-200 w-full mt-4"
          style={{ height: "2px" }}
        ></div>
        <div className="nav-menu w-full container">
          <ul className="flex">
            <li className="text-fb font-semibold text-lg mr-6 border-b-4 p-4 border-fb">
              Posts
            </li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">
              About
            </li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">
              Friends
            </li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">
              Photos
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-100 pt-5">
        <div className="flex justify-around container">
          <div className="sidebar hidden md:flex flex-col w-1/3 mr-4 static top-4">
            <div className="sidebar-item bg-white p-5 rounded-lg shadow-md mb-4 stikcy top-4">
              <h1 className="font-bold text-3xl mb-5">Intro</h1>
              <p className="mb-4">
                Followed by <b>54 People</b>
              </p>
              <p className="mb-4">
                Following <b>54 People</b>
              </p>
              <p className="mb-4">
                Lives in <b>Basti, Uttar Pradesh</b>
              </p>
              <p className="mb-4">
                From <b>Basti, Uttar Pradesh</b>
              </p>
              <p className="mb-4">Joined December 2015</p>
              <Button
                variant="secondary"
                text="Edit Intro"
                className="font-bold p-2"
              />
            </div>
            <div className="sidebar-item bg-white p-5 rounded-lg shadow-md mb-4 stikcy top-4">
              <h1 className="font-bold text-3xl mb-5">Photos</h1>
              <div className="grid grid-cols-3 gap-2">
                <a href="#!" className="hover:opacity-95">
                  <img
                    src="https://scontent.fknu1-3.fna.fbcdn.net/v/t31.18172-8/c19.0.160.160a/p160x160/16991577_2110814709144795_2451303396773672527_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=574b62&_nc_ohc=AKT-GgjbvqgAX8hjtJH&_nc_ht=scontent.fknu1-3.fna&oh=70918e7149d1cdf3dfae675520500e64&oe=6155F7C8"
                    alt=""
                  />
                </a>
                <a href="#!">
                  <img
                    src="https://scontent.fknu1-3.fna.fbcdn.net/v/t31.18172-8/c19.0.160.160a/p160x160/16991577_2110814709144795_2451303396773672527_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=574b62&_nc_ohc=AKT-GgjbvqgAX8hjtJH&_nc_ht=scontent.fknu1-3.fna&oh=70918e7149d1cdf3dfae675520500e64&oe=6155F7C8"
                    alt=""
                  />
                </a>
                <a href="#!">
                  <img
                    src="https://scontent.fknu1-3.fna.fbcdn.net/v/t31.18172-8/c19.0.160.160a/p160x160/16991577_2110814709144795_2451303396773672527_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=574b62&_nc_ohc=AKT-GgjbvqgAX8hjtJH&_nc_ht=scontent.fknu1-3.fna&oh=70918e7149d1cdf3dfae675520500e64&oe=6155F7C8"
                    alt=""
                  />
                </a>
                <a href="#!">
                  <img
                    src="https://scontent.fknu1-3.fna.fbcdn.net/v/t31.18172-8/c19.0.160.160a/p160x160/16991577_2110814709144795_2451303396773672527_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=574b62&_nc_ohc=AKT-GgjbvqgAX8hjtJH&_nc_ht=scontent.fknu1-3.fna&oh=70918e7149d1cdf3dfae675520500e64&oe=6155F7C8"
                    alt=""
                  />
                </a>
                <a href="#!">
                  <img
                    src="https://scontent.fknu1-3.fna.fbcdn.net/v/t31.18172-8/c19.0.160.160a/p160x160/16991577_2110814709144795_2451303396773672527_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=574b62&_nc_ohc=AKT-GgjbvqgAX8hjtJH&_nc_ht=scontent.fknu1-3.fna&oh=70918e7149d1cdf3dfae675520500e64&oe=6155F7C8"
                    alt=""
                  />
                </a>
                <a href="#!">
                  <img
                    src="https://scontent.fknu1-3.fna.fbcdn.net/v/t31.18172-8/c19.0.160.160a/p160x160/16991577_2110814709144795_2451303396773672527_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=574b62&_nc_ohc=AKT-GgjbvqgAX8hjtJH&_nc_ht=scontent.fknu1-3.fna&oh=70918e7149d1cdf3dfae675520500e64&oe=6155F7C8"
                    alt=""
                  />
                </a>
                <a href="#!">
                  <img
                    src="https://scontent.fknu1-3.fna.fbcdn.net/v/t31.18172-8/c19.0.160.160a/p160x160/16991577_2110814709144795_2451303396773672527_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=574b62&_nc_ohc=AKT-GgjbvqgAX8hjtJH&_nc_ht=scontent.fknu1-3.fna&oh=70918e7149d1cdf3dfae675520500e64&oe=6155F7C8"
                    alt=""
                  />
                </a>
                <a href="#!">
                  <img
                    src="https://scontent.fknu1-3.fna.fbcdn.net/v/t31.18172-8/c19.0.160.160a/p160x160/16991577_2110814709144795_2451303396773672527_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=574b62&_nc_ohc=AKT-GgjbvqgAX8hjtJH&_nc_ht=scontent.fknu1-3.fna&oh=70918e7149d1cdf3dfae675520500e64&oe=6155F7C8"
                    alt=""
                  />
                </a>
                <a href="#!">
                  <img
                    src="https://scontent.fknu1-3.fna.fbcdn.net/v/t31.18172-8/c19.0.160.160a/p160x160/16991577_2110814709144795_2451303396773672527_o.jpg?_nc_cat=107&ccb=1-5&_nc_sid=574b62&_nc_ohc=AKT-GgjbvqgAX8hjtJH&_nc_ht=scontent.fknu1-3.fna&oh=70918e7149d1cdf3dfae675520500e64&oe=6155F7C8"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="sidebar bg-white w-full md:w-3/4 mr-4 p-4 rounded-lg shadow-md">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
              quidem repudiandae veniam ut inventore nobis voluptas voluptatem
              magni eligendi aspernatur soluta aliquam architecto amet,
              veritatis odit fugit sapiente distinctio itaque.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
              quidem repudiandae veniam ut inventore nobis voluptas voluptatem
              magni eligendi aspernatur soluta aliquam architecto amet,
              veritatis odit fugit sapiente distinctio itaque.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
              quidem repudiandae veniam ut inventore nobis voluptas voluptatem
              magni eligendi aspernatur soluta aliquam architecto amet,
              veritatis odit fugit sapiente distinctio itaque. lorem1. Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quae
              aperiam placeat reiciendis doloribus cum, quod quam nulla soluta
              eaque quas et ducimus, laudantium sit odio incidunt esse! Eligendi
              quis exercitationem ea, impedit corrupti aspernatur consequuntur
              voluptas dicta nostrum a officia delectus assumenda minus
              consectetur, placeat expedita qui obcaecati est. Quia sit labore,
              deserunt vero enim ipsa sunt dicta eius accusantium molestias in,
              vitae et nemo culpa! Minus inventore architecto vero atque
              adipisci consequuntur perspiciatis. Possimus sed qui omnis,
              numquam eveniet, nemo laboriosam maxime voluptatibus, esse quidem
              magnam veritatis praesentium veniam assumenda expedita inventore
              consequuntur. Unde officia est exercitationem accusantium
              temporibus distinctio eveniet dolore iste magnam quasi, illum
              inventore minus dolores dolorum dicta qui delectus quibusdam!
              Illum eligendi dolorum, asperiores praesentium laudantium expedita
              mollitia aliquid officiis et, quos, magnam corporis quas culpa
              amet soluta odit dolores totam impedit sint harum illo eaque in
              vitae nobis. Explicabo, accusantium, amet illo perferendis cumque
              voluptates fugiat omnis aspernatur culpa modi, ullam quasi? Sint
              optio aliquid, molestias quia nulla corrupti, quo vero autem velit
              iure ad? Quibusdam omnis distinctio laudantium doloremque ullam
              iure laboriosam iusto ex et vitae corporis dicta provident illum
              reprehenderit quia, eos rem quo labore sequi, illo voluptatibus
              eaque accusamus suscipit tempora! Nobis voluptates perferendis
              illum delectus laboriosam amet expedita modi. Cupiditate commodi
              non beatae exercitationem quis delectus repudiandae in. Excepturi
              eveniet eius commodi laborum ut inventore fugit, odio dolore iusto
              asperiores. Obcaecati itaque labore distinctio? Quidem expedita
              odit rerum nostrum quo commodi deleniti at vero ipsum laborum
              iusto quam dolor corporis, modi sit eveniet sequi repudiandae
              tempore. Praesentium totam quos soluta repellat culpa? Eum
              possimus voluptatem eligendi vel eveniet deleniti, maiores
              accusantium mollitia aperiam accusamus dolores dolorum illo quod
              quam illum aspernatur vero sint dolor neque expedita cum rem. Esse
              fugit culpa sint repellendus hic, reprehenderit, labore repellat
              optio dolores nisi, fuga molestias! Accusamus iste amet beatae
              quibusdam? At quae nisi necessitatibus aliquid vero. Cumque iste
              minus explicabo autem, iure placeat in dignissimos delectus, esse,
              modi laborum porro nobis. Commodi maxime harum eius ab at qui,
              numquam corrupti veritatis laborum provident vero aliquam culpa,
              architecto fugiat vel accusamus placeat dolorem sequi nihil
              repudiandae praesentium quaerat eligendi. Deleniti consequuntur
              accusamus non aspernatur impedit ducimus nisi quia dicta. Tenetur
              dolore aperiam aspernatur magni possimus explicabo, libero ab, eos
              et amet aut nam quia porro rem? Explicabo minima natus assumenda
              nihil porro obcaecati dolore incidunt aliquam vel laborum
              similique optio ut nostrum nam ad, quo nobis exercitationem
              repudiandae molestias in doloremque quis atque. Autem, saepe.
              Placeat, cumque obcaecati debitis reiciendis quos natus ipsam quia
              fugiat possimus deleniti laudantium tempora, totam mollitia at
              minus recusandae doloremque. Voluptatibus adipisci ex enim sunt
              provident quam veritatis accusantium distinctio perspiciatis et
              aliquam, consectetur, architecto iusto necessitatibus labore vero
              porro nihil dolores odit ullam suscipit modi esse quae? Porro
              accusantium repudiandae, fuga tenetur architecto vitae temporibus
              aperiam sunt laboriosam beatae voluptate, laborum tempora, nulla
              in at consequatur explicabo exercitationem optio. Ipsam cumque
              ipsa eum unde praesentium mollitia totam, laboriosam omnis
              assumenda porro itaque corporis deserunt necessitatibus. Tempore
              quidem placeat nam rerum quisquam nemo, magni illo? A possimus
              deleniti, dicta omnis quo facere soluta voluptate ad, similique
              illo blanditiis provident eaque unde officiis vitae repellendus
              molestiae incidunt. Optio animi non suscipit dolore facilis quae
              repudiandae eveniet fuga culpa adipisci soluta quos eius, commodi
              ratione cum? Et neque at eius deleniti quia asperiores ab natus
              ducimus maxime non, voluptas architecto dolores iure fuga, nostrum
              eveniet excepturi impedit eum accusantium, odit amet quibusdam!
              Eaque debitis explicabo quisquam harum, architecto autem sunt
              dolores cumque animi dicta, illum, quidem sint minus aut. Et natus
              necessitatibus ipsa tenetur nisi, magni ex corrupti quasi saepe?
              Nesciunt fugit, reiciendis, tempore sed aliquam esse dignissimos
              officiis, corporis at illo eos illum dolor ad consectetur
              voluptates! Officiis odit asperiores eaque magnam, accusamus
              molestiae pariatur laudantium eius quibusdam quia. Iusto nostrum
              cum et? Explicabo veniam distinctio ullam repellat laudantium
              necessitatibus, iusto at sed nesciunt? Maxime aspernatur voluptas
              eum vel dolorum aperiam ipsum delectus deserunt dicta impedit
              omnis reiciendis sunt officiis sit, vitae atque nesciunt. Nostrum,
              totam voluptates quisquam facilis deserunt blanditiis dolor
              dolores suscipit cupiditate earum iure? Ratione ipsam veniam
              voluptate dignissimos ab numquam, error esse perferendis tempora
              consectetur eum nesciunt, nam aspernatur quasi eius quod corporis,
              rem laudantium. Ipsam sit reprehenderit maxime minus mollitia
              voluptates inventore dicta unde et exercitationem voluptate neque
              maiores voluptatem dolores, dignissimos provident, odio
              voluptatibus sunt ut. Velit adipisci a aliquid nisi eveniet,
              aperiam numquam nihil ipsum, praesentium dolorem facere
              accusantium corrupti! Quo dolore ipsum ab laboriosam voluptatum
              reiciendis? Eum nesciunt at aut aliquid sequi doloribus veniam
              repellat pariatur exercitationem reiciendis rerum, hic harum
              maxime beatae perspiciatis odit dicta dolores facilis temporibus?
              Mollitia eos reiciendis facere minus temporibus. Fuga et incidunt
              quod tenetur, cupiditate ipsam aliquam sequi culpa non omnis
              possimus asperiores dicta, quas minus beatae iure, cum qui
              mollitia hic repellendus repudiandae vitae commodi neque! Ullam
              expedita odio, aliquid quis ea cum quam maxime vero eligendi nam.
              Tempora, autem! Modi delectus deserunt iure quae accusamus,
              officiis voluptatem praesentium magnam inventore doloremque illum
              non explicabo facilis accusantium odit quis ea, nemo cum? Eum
              consequuntur vel voluptatibus illo cum a, distinctio ipsa aliquam.
              Nulla asperiores inventore mollitia, sint officiis neque ea porro
              sit laboriosam minus autem doloribus eius dolor rerum eligendi
              debitis veritatis eaque illum, ex deleniti voluptates aliquam
              reprehenderit nesciunt? Incidunt iure quibusdam velit tempore
              laudantium corporis repellat voluptatem alias totam sint dicta
              minus, eligendi ea rem atque. Magnam, voluptatibus ratione. Velit
              praesentium debitis possimus dolorum commodi modi ad voluptatibus
              maiores sed adipisci inventore quis quaerat, cum cumque quos unde
              nulla quisquam quod, eius iure impedit necessitatibus aspernatur?
              Deserunt nam magni rerum et illo maiores esse doloribus, voluptas
              fugit, adipisci cumque ut cupiditate voluptates laudantium
              blanditiis quas dolore repellat distinctio provident aspernatur
              quasi? Incidunt saepe quaerat error at ipsam est ipsa aliquam
              eaque, quam nobis praesentium ex impedit doloribus iusto non
              eligendi, voluptatem esse inventore, voluptate atque ea fugit. Non
              sit tempora alias dolor reprehenderit natus quidem quas omnis!
              Excepturi blanditiis commodi nemo veniam, quidem amet unde quae
              nihil error, dolorem aut, facilis maiores!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

//react palette
