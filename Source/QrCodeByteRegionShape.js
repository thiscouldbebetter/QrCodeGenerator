
class QrCodeByteRegionShape
{
	constructor(name, bitOffsetsInOrderIncreasing)
	{
		this.name = name;
		this.bitOffsetsInOrderIncreasing = bitOffsetsInOrderIncreasing;
	}

	static Instances()
	{
		if (QrCodeByteRegionShape._instances == null)
		{
			QrCodeByteRegionShape._instances =
				new QrCodeByteRegionShape_Instances();
		}
		return QrCodeByteRegionShape._instances;
	}

	static byName(name)
	{
		return QrCodeByteRegionShape.Instances().byName(name);
	}
}

class QrCodeByteRegionShape_Instances
{
	constructor()
	{
		var brs = QrCodeByteRegionShape;
		var c = Coords;

		this.EssVertical = new brs
		(
			// 7
			// 56
			// 34
			// 12
			//  0

			"EssVertical",
			[
				new c(1, 4),
				new c(0, 3),
				new c(1, 3),
				new c(0, 2),
				new c(1, 2),
				new c(0, 1),
				new c(1, 1),
				new c(0, 0),
			]
		);

		this.EssVerticalSplit = new brs
		(
			// 7
			// 56
			// ..
			// 34
			// 12
			//  0

			"EssVerticalSplit",
			[
				new c(1, 5),
				new c(0, 4),
				new c(1, 4),
				new c(0, 3),
				new c(1, 3),
				new c(0, 1),
				new c(1, 1),
				new c(0, 0)
			]
		);

		this.FourByTwoClockwise = new brs
		(
			// 8721
			// 6543

			"FourByTwoClockwise",
			[
				new c(3, 0),
				new c(2, 0),
				new c(3, 1),
				new c(2, 1),
				new c(1, 1),
				new c(0, 1),
				new c(1, 0),
				new c(0, 0)
			]
		);

		this.FourByTwoCounterclockwise = new brs
		(
			// 6543
			// 8721

			"FourByTwoCounterclockwise",
			[
				new c(3, 1),
				new c(2, 1),
				new c(3, 0),
				new c(2, 0),
				new c(1, 0),
				new c(0, 0),
				new c(1, 1),
				new c(0, 1)
			]
		);

		this.FourByTwoLeft = new brs
		(
			// 0167
			// 2345

			"FourByTwoLeft",
			[
				new c(0, 0),
				new c(1, 0),
				new c(0, 1),
				new c(1, 1),
				new c(2, 1),
				new c(3, 1),
				new c(2, 0),
				new c(3, 0)
			]
		);

		this.OneByFourPlusTwoByTwo = new brs
		(
			// 0123
			//   45
			//   67

			"OneByFourPlusTwoByTwo",
			[
				new c(0, 0),
				new c(1, 0),
				new c(2, 0),
				new c(3, 0),
				new c(2, 1),
				new c(3, 1),
				new c(2, 2),
				new c(3, 2)
			]
		);

		this.OneBySixPlusOneByTwo = new brs
		(
			// 0
			// 1
			// 2
			// 3
			// 4 5
			// 6 7

			"OneBySixPlusOneByTwo",
			[
				new c(0, 0),
				new c(0, 1),
				new c(0, 2),
				new c(0, 3),
				new c(0, 4),
				new c(1, 4),
				new c(0, 5),
				new c(1, 5)
			]
		);

		this.Pee = new brs
		(
			// 012
			//  34
			//  56
			//  7

			"Pee", // Heh.
			[
				new c(0, 0),
				new c(1, 0),
				new c(2, 0),
				new c(1, 1),
				new c(2, 1),
				new c(1, 2),
				new c(2, 2),
				new c(1, 3),
			]
		);

		this.PeeInverted = new brs
		(
			//  7
			//  56
			//  34
			// 012

			"PeeInverted", // Heh.
			[
				new c(0, 3),
				new c(1, 3),
				new c(2, 3),
				new c(1, 2),
				new c(2, 2),
				new c(1, 1),
				new c(2, 1),
				new c(1, 0),
			]
		);

		this.PeeInvertedSplit = new brs
		(
			// 0
			// .
			// .
			// .
			// .
			// .7
			// .56
			// .34
			// .12

			"PeeInvertedSplit", // Heh heh.
			[
				new c(0, 0),
				new c(1, 8),
				new c(2, 8),
				new c(1, 7),
				new c(2, 7),
				new c(1, 6),
				new c(2, 6),
				new c(1, 5),
			]
		);

		this.PeeSplit = new brs
		(
			// 0.12
			//   34
			//   56
			//   7

			"PeeSplit", // Heh.
			[
				new c(0, 0),
				new c(2, 0),
				new c(3, 0),
				new c(2, 1),
				new c(3, 1),
				new c(2, 2),
				new c(3, 2),
				new c(2, 3),
			]
		);

		this.TwoByTwoDown = new brs
		(
			// 21
			// 43

			"TwoByTwoDown",
			[
				new c(1, 0),
				new c(0, 0),
				new c(1, 1),
				new c(0, 1)
			]
		);

		this.TwoByTwoUp = new brs
		(
			// 43
			// 21
			"TwoByTwoUp",
			[
				new c(1, 1),
				new c(0, 1),
				new c(1, 0),
				new c(0, 0)
			]
		);

		this.TwoByFourDown = new brs
		(
			// 67
			// 45
			// 23
			// 01

			"TwoByFourDown",
			[
				new c(0, 3),
				new c(1, 3),
				new c(0, 2),
				new c(1, 2),
				new c(0, 1),
				new c(1, 1),
				new c(0, 0),
				new c(1, 0)
			]
		);

		this.TwoByFourDownSplit = new brs
		(
			// 67
			// 45
			// ..
			// ..
			// ..
			// ..
			// ..
			// 23
			// 01

			"TwoByFourDownSplit",
			[
				new c(0, 8),
				new c(1, 8),
				new c(0, 7),
				new c(1, 7),
				new c(0, 1),
				new c(1, 1),
				new c(0, 0),
				new c(1, 0)

			]
		);

		this.TwoByFourUp = new brs
		(
			// 01
			// 23
			// 45
			// 67

			"TwoByFourUp",
			[
				new c(0, 0),
				new c(1, 0),
				new c(0, 1),
				new c(1, 1),
				new c(0, 2),
				new c(1, 2),
				new c(0, 3),
				new c(1, 3)
			]
		);

		this.ZeeVertical = new brs
		(
			//  0
			// 12
			// 34
			// 56
			// 7

			"ZeeVertical",
			[
				new c(1, 0),
				new c(0, 1),
				new c(1, 1),
				new c(0, 2),
				new c(1, 2),
				new c(0, 3),
				new c(1, 3),
				new c(0, 4),
			]
		);

		this.ZeeVerticalSplit = new brs
		(
			//  0
			// 12
			// 34
			// ..
			// 56
			// 7

			"ZeeVerticalSplit",
			[
				new c(1, 0),
				new c(0, 1),
				new c(1, 1),
				new c(0, 2),
				new c(1, 2),
				new c(0, 4),
				new c(1, 4),
				new c(0, 5),
			]
		);


		this._All =
		[
			this.EssVertical,
			this.EssVerticalSplit,
			this.FourByTwoClockwise,
			this.FourByTwoCounterclockwise,
			this.FourByTwoLeft,
			this.OneByFourPlusTwoByTwo,
			this.OneBySixPlusOneByTwo,
			this.Pee,
			this.PeeInverted,
			this.PeeInvertedSplit,
			this.PeeSplit,
			this.TwoByFourDown,
			this.TwoByFourDownSplit,
			this.TwoByFourUp,
			this.TwoByTwoUp,
			this.TwoByTwoDown,
			this.ZeeVertical,
			this.ZeeVerticalSplit,
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x]));
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}
