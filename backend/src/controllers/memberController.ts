import { Request, Response } from "express";
import Member from "../models/Member";

// Create new member
export const createMember = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sample = await Member.create({
      name: "Ahmed Ali",
      phone: "0631234567",
      address: "Hargeisa, Somalia",
      StartedDate: new Date(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
      gender: "male",
      paymentType: "monthly",
      paymentMethod: "zaad",
      Price: 25,
    });

    res.status(201).json(sample);
  }catch (err: any) {
  console.error(" Member creation error:", err);
  res.status(400).json({ error: err.message || "Failed to create sample member" });
}

};

// Bulk import members from JSON payload
export const importMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = req.body;

    if (!Array.isArray(members) || members.length === 0) {
      res.status(400).json({ error: "Invalid or empty member list" });
      return;
    }

    // Optional: Validate required fields
    const sanitized = members.map((m) => ({
      name: m.name?.toString().trim() || "Unnamed",
      phone: m.phone?.toString() || "",
      address: m.address?.toString() || "",
      StartedDate: new Date(m.StartedDate),
      expiryDate: new Date(m.expiryDate),
      gender: m.gender === "female" ? "female" : "male",
      paymentType: m.paymentType?.toLowerCase() || "monthly",
      paymentMethod: m.paymentMethod?.toLowerCase() || "cash",
      Price: Number(m.Price) || 0,
      Discount: Number(m.Discount) || 0,
    }));

    const inserted = await Member.insertMany(sanitized);
    res.status(201).json({ message: "Members imported successfully", count: inserted.length });
  } catch (error: any) {
    console.error("❌ Import error:", error);
    res.status(500).json({ error: error.message || "Failed to import members" });
  }
};


// Get all members
export const getAllMembers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch {
    res.status(500).json({ error: "Failed to fetch members" });
  }
};

// Get one member by ID
export const getMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await Member.findById(req.params.id);
    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ error: "Member not found" });
    }
  } catch {
    res.status(500).json({ error: "Failed to retrieve member" });
  }
};

// Update a member
export const updateMember = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  

  try {
    const member = await Member.findById(id);
    if (!member) {
      res.status(404).json({ error: "Member not found" });
      return;
    }

    const {
      name,
      phone,
      address,
      StartedDate,
      expiryDate,
      gender,
      paymentType,
      paymentMethod,
      Price,
      Discount,
    } = req.body;

    member.name = name ?? member.name;
    member.phone = phone ?? member.phone;
    member.address = address ?? member.address;
    member.StartedDate = StartedDate ?? member.StartedDate;
    member.expiryDate = expiryDate ?? member.expiryDate;
    member.gender = gender ?? member.gender;
    member.paymentType = paymentType ?? member.paymentType;
    member.paymentMethod = paymentMethod ?? member.paymentMethod;
    member.Price = Price ?? member.Price;
    member.Discount = req.body.Discount ?? member.Discount; 

    const updated = await member.save();
    res.status(200).json(updated);
} catch (err: any) {
  console.error("❌ Update failed:", err); // <— add this
  res.status(500).json({ error: "Failed to update member" });
}

  
};

// Delete a member
export const deleteMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      res.status(404).json({ error: "Member not found" });
      return;
    }

    await member.deleteOne();
    res.status(200).json({ message: "Member deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete member" });
  }
};
