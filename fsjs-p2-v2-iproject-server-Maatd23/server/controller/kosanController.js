const {
  Kosan,
  FacilitiesKosan,
  Facility,
  sequelize,
} = require("../models/index");

class KosanController {
  static async getKosan(req, res, next) {
    try {
      let limit = 8;
      let page = req.query.page || 1;
      let sortFacility = req.query.facility;
      let search = req.query.search;
      let option = {
        include: {
          model: Facility,
        },
        limit,
      };

      if (page) {
        option.offset = (page - 1) * limit;
      }
      if (sortFacility) {
        option.include.where = {
          id: sortFacility,
        };
      }
      if (search) {
        option.where.name = { [Op.iLike]: `%${search}%` };
      }
      let { count, rows } = await Kosan.findAndCountAll(option);
      const result = {
        totalData: count,
        totalPage: Math.ceil(count / limit),
        data: rows,
      };
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async addKosan(req, res, next) {
    try {
      const {
        name,
        address,
        rooms,
        price,
        region,
        longitude,
        latitude,
        imgUrl,
      } = req.body;
      const userId = req.userId;
      const data = {
        name,
        address,
        rooms,
        price,
        region,
        longitude,
        latitude,
        userId,
        imgUrl,
      };
      const kosan = await Kosan.create(data);
      const KosanId = kosan.id;
      const FacilityIds = req.query.FacilityId;
      const facilitieskosanData = FacilityIds.map((FacilityId) => {
        return {
          KosanId,
          FacilityId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
      const results = await sequelize.queryInterface.bulkInsert(
        "FacilitiesKosans",
        facilitieskosanData
      );
      res.status(201).json({ message: "success added to kosan" });
    } catch (err) {
      next(err);
    }
  }

  static async addFacilityKosan(req, res, next) {
    try {
      const KosanId = req.params.KosanId;
      const FacilityIds = req.query.FacilityId;
      const facilityId = FacilityIds.split("");
      const facilitieskosanData = facilityId.map((FacilityId) => {
        return {
          KosanId,
          FacilityId: FacilityId || FacilityIds,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      console.log(facilitieskosanData);
      const results = await sequelize.queryInterface.bulkInsert(
        "FacilitiesKosans",
        facilitieskosanData
      );

      res.status(201).json({ message: "success added to fasilitas" });
    } catch (err) {
      next(err);
    }
  }
  static async findOneKosan(req, res, next) {
    try {
      const id = req.params.id;
      const kosan = await Kosan.findOne({
        where: {
          id,
        },
        include: {
          model: Facility,
        },
      });
      if (!kosan) throw { name: "NotFound" };
      res.status(201).json(kosan);
    } catch (err) {
      next(err);
    }
  }

  static async getFacility(req, res, next) {
    try {
      const facility = await Facility.findAll();
      if (!facility) throw { name: "NotFound" };
      res.status(201).json(facility);
    } catch (err) {
      next(err);
    }
  }

  static async;

  static async deleteFacilityKosan(req, res, next) {
    try {
      const id = req.params.KosanId;
      console.log;
      const FacilityId = req.body.FacilityId;
      const facilities = await FacilitiesKosan.destroy({
        where: {
          KosanId: id,
          FacilityId,
        },
      });
      res.status(201).json({ message: "success delete " });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = KosanController;
