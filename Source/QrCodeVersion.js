
class QrCodeVersion
{
	constructor(id, name, sizeInCells, byteRegions)
	{
		this.id = id;
		this.name = name;
		this.sizeInCells = sizeInCells;
		this.byteRegions = byteRegions;
	}

	static Instances()
	{
		if (QrCodeVersion._instances == null)
		{
			QrCodeVersion._instances = new QrCodeVersion_Instances();
		}
		return QrCodeVersion._instances;
	}

	static byId(id)
	{
		return QrCodeVersion.Instances().byId(id);
	}
}

class QrCodeVersion_Instances
{
	constructor()
	{
		var brShapes = QrCodeByteRegionShape.Instances();
		var br = QrCodeByteRegion;
		var c = Coords;

		this.One = new QrCodeVersion
		(
			1,
			"One",
			Coords.ones().multiplyScalar(21),
			[
				new br(brShapes.TwoByTwoUp.name, new c(19, 19)), // encoding

				new br(brShapes.TwoByFourUp.name, new c(19, 15)), // length

				// data payload
				new br (brShapes.TwoByFourUp.name, new c(19, 11)),
				new br (brShapes.FourByTwoCounterclockwise.name, new c(17, 9)),
				new br (brShapes.TwoByFourDown.name, new c(17, 11)),
				new br (brShapes.TwoByFourDown.name, new c(17, 15)),
				new br (brShapes.FourByTwoClockwise.name, new c(15, 19)),
				new br (brShapes.TwoByFourUp.name, new c(15, 15)),
				new br (brShapes.TwoByFourUp.name, new c(15, 11)),
				new br (brShapes.FourByTwoCounterclockwise.name, new c(13, 9)),
				new br (brShapes.TwoByFourDown.name, new c(13, 11)),
				new br (brShapes.TwoByFourDown.name, new c(13, 15)),
				new br (brShapes.FourByTwoClockwise.name, new c(11, 19)),
				new br (brShapes.TwoByFourUp.name, new c(11, 15)),
				new br (brShapes.TwoByFourUp.name, new c(11, 11)),
				new br (brShapes.TwoByFourUp.name, new c(11, 7)),
				// interrupted by timing line
				new br (brShapes.TwoByFourUp.name, new c(11, 2)),
				new br (brShapes.FourByTwoCounterclockwise.name, new c(9, 0)),
				new br (brShapes.TwoByFourDown.name, new c(9, 2)),
				// interrupted by timing line
				new br(brShapes.TwoByTwoDown.name, new c(9, 7)), // end of data payload

				// error correction
				new br (brShapes.TwoByFourDown.name, new c(9, 9)),
				new br (brShapes.TwoByFourDown.name, new c(9, 13)),
				new br (brShapes.TwoByFourDown.name, new c(9, 17)),
				// interrupted by corner 
				new br (brShapes.TwoByFourUp.name, new c(7, 9)),
				new br (brShapes.TwoByFourDown.name, new c(4, 9)),
				new br (brShapes.TwoByFourUp.name, new c(2, 9)),
				new br (brShapes.TwoByFourDown.name, new c(0, 9))
			]
		);

		this.Three = new QrCodeVersion
		(
			3,
			"Three",
			Coords.ones().multiplyScalar(29),
			[
				// todo - The assignment of regions
				// to data or error correction
				// may change based on format information?

				// Data regions 1 through 3:
				// Two-cell-by-four-cell rectangles
				// from the lower-right corner
				// up to the upper-right corner square,
				// skipping every other one for now,
				// because those are read later in the sequence.

				new br(brShapes.TwoByFourUp.name, new c(27, 25)),
				new br(brShapes.TwoByFourUp.name, new c(27, 17)),
				new br(brShapes.TwoByFourUp.name, new c(27, 9)),

				// Data regions 4 and 5:
				// Rectangles going down again,
				// still skipping every other one.

				new br(brShapes.TwoByFourDown.name, new c(25, 13)),
				new br(brShapes.TwoByFourDown.name, new c(25, 21)),

				// Data regions 6 and 7:
				// Up again, skipping over the alignment box,
				// and bumping into the upper-right corner square.
				new br(brShapes.TwoByFourUp.name, new c(23, 25)),
				// Skip over 5-pixel alignment box.
				new br(brShapes.TwoByFourUp.name, new c(23, 12)),

				// Data regions 8 and 9:
				// Rectangles down again, and the alignment box
				// splits the second one.
				new br(brShapes.TwoByFourDown.name, new c(21, 10)),
				// Skip over 5-pixel alignment box.
				new br(brShapes.TwoByFourDownSplit.name, new c(21, 18)),

				// Data regions 10-12:
				// Wrap around the alignment box.
				// then switch to zees,
				// and the second zee is split
				// on the "timing bar".
				new br(brShapes.OneBySixPlusOneByTwo.name, new c(19, 21)),
				new br(brShapes.ZeeVertical.name, new c(19, 12)),
				new br(brShapes.ZeeVerticalSplit.name, new c(19, 4)),

				// Data region 13:
				new br(brShapes.EssVertical.name, new c(17, 0)),

				// Data regions 14 - 15.
				// Go back to right after region 1 and interleave.
				new br(brShapes.TwoByFourUp.name, new c(27, 21)),
				new br(brShapes.TwoByFourUp.name, new c(27, 13)),

				// Data regions 16-18.
				new br(brShapes.TwoByFourDown.name, new c(25, 9)),
				new br(brShapes.TwoByFourDown.name, new c(25, 17)),
				new br(brShapes.TwoByFourDown.name, new c(25, 25)),

				// Data regions 19 and 20.
				new br(brShapes.TwoByFourUp.name, new c(23, 16)),
				// There's no room for another two-by-four rectangle here.
				new br(brShapes.OneByFourPlusTwoByTwo.name, new c(21, 9)),

				// Data regions 21 and 22.
				new br(brShapes.TwoByFourDown.name, new c(21, 14)),
				// Turn it sideways to avoid the bottom.
				new br(brShapes.FourByTwoLeft.name, new c(19, 27)),

				// Data regions 23-25.
				// Zees up, second one split, end on a pee.
				new br(brShapes.ZeeVertical.name, new c(19, 3)),
				new br(brShapes.ZeeVerticalSplit.name, new c(19, 8)),
				new br(brShapes.Pee.name, new c(18, 0)),

				// Data region 26.  This is the last data region.
				new br(brShapes.EssVerticalSplit.name, new c(17, 4)),

				// Error correction regions.
				// These pick up right after the last data region,
				// and sweep down and then up iteratively,
				// skipping over every other region,
				// until the left side of the code is reached,
				// then start over right after EC region 1,
				// and interleaving between the existing regions.

				new br(brShapes.EssVertical.name, new c(17, 9)), // e1
				new br(brShapes.EssVertical.name, new c(17, 17)), // e2
				new br(brShapes.PeeInverted.name, new c(16, 25)), // e3

				new br(brShapes.ZeeVertical.name, new c(15, 20)), // e4
				new br(brShapes.ZeeVertical.name, new c(15, 12)), // e5
				new br(brShapes.ZeeVerticalSplit.name, new c(15, 3)), // e6

				new br(brShapes.EssVertical.name, new c(13, 0)), // e7
				new br(brShapes.EssVertical.name, new c(13, 9)), // e8
				new br(brShapes.EssVertical.name, new c(13, 17)), // e9
				new br(brShapes.PeeInverted.name, new c(12, 25)), // e10

				new br(brShapes.ZeeVertical.name, new c(11, 20)), // e11
				new br(brShapes.ZeeVertical.name, new c(11, 12)), // e12
				new br(brShapes.ZeeVerticalSplit.name, new c(11, 3)), // e13

				new br(brShapes.EssVertical.name, new c(9, 0)), // e14
				new br(brShapes.EssVertical.name, new c(9, 9)), // e15
				new br(brShapes.EssVertical.name, new c(9, 17)), // e16
				new br(brShapes.PeeInvertedSplit.name, new c(9, 20)), // e17

				new br(brShapes.ZeeVertical.name, new c(7, 11)), // e18

				new br(brShapes.EssVertical.name, new c(4, 9)), // e19
				new br(brShapes.PeeInverted.name, new c(3, 17)), // e20

				new br(brShapes.ZeeVertical.name, new c(2, 12)), // e21

				new br(brShapes.EssVertical.name, new c(0, 9)), // e22

				// Restart right after error correction region 1 and interleave.
				new br(brShapes.EssVertical.name, new c(17, 13)), // e23
				new br(brShapes.EssVertical.name, new c(17, 21)), // e24

				new br(brShapes.ZeeVertical.name, new c(15, 24)), // e25
				new br(brShapes.ZeeVertical.name, new c(15, 16)), // e26
				new br(brShapes.ZeeVertical.name, new c(15, 8)), // e27
				new br(brShapes.Pee.name, new c(14, 0)), // e28

				new br(brShapes.EssVerticalSplit.name, new c(13, 4)), // e29
				new br(brShapes.EssVertical.name, new c(13, 13)), // e30
				new br(brShapes.EssVertical.name, new c(13, 21)), // e31

				new br(brShapes.ZeeVertical.name, new c(11, 24)), // e32
				new br(brShapes.ZeeVertical.name, new c(11, 16)), // e33
				new br(brShapes.ZeeVertical.name, new c(11, 8)), // e34
				new br(brShapes.Pee.name, new c(10, 0)), // e35

				new br(brShapes.EssVerticalSplit.name, new c(9, 4)), // e36
				new br(brShapes.EssVertical.name, new c(9, 13)), // e37
				new br(brShapes.EssVertical.name, new c(9, 21)), // e38

				new br(brShapes.ZeeVertical.name, new c(7, 16)), // e39
				new br(brShapes.PeeSplit.name, new c(5, 9)), // e40

				new br(brShapes.EssVertical.name, new c(4, 13)), // e41

				new br(brShapes.ZeeVertical.name, new c(2, 16)), // e42
				new br(brShapes.Pee.name, new c(1, 9)), // e43

				new br(brShapes.EssVertical.name, new c(0, 13)), // e43

				// There are 7 unused cells.

			]
		);

		this._All =
		[
			this.One,
			this.Three
		];

		this._AllById = new Map(this._All.map(x => [x.id, x]));
	}

	byId(id)
	{
		return this._AllById.get(id);
	}
}
